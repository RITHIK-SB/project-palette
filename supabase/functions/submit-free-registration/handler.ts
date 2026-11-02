import { clientIpFromRequest, consumeRateLimit, hashIp, type RpcClient } from "./rate-limit.ts";
import { type TurnstileResult } from "./turnstile.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const ALLOWED_BUILDING_TYPES = [
  "institutions",
  "hospitals",
  "industries",
  "warehouses",
  "commercial",
  "high-rise-residential",
  "other",
];

const MAX_FIELD_LENGTHS = {
  email: 254,
  company_name: 200,
  contact_person: 100,
  designation: 100,
  mobile_number: 20,
  building_type: 50,
  building_type_other: 200,
} as const;

type RegistrationData = {
  email: string;
  company_name: string;
  contact_person: string;
  designation: string;
  mobile_number: string;
  building_type: string;
  building_type_other?: string | null;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^\d{10}$/;

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateRegistration(raw: RegistrationData): RegistrationData {
  if (!raw || typeof raw !== "object" ||
      typeof raw.email !== "string" || typeof raw.company_name !== "string" ||
      typeof raw.contact_person !== "string" || typeof raw.designation !== "string" ||
      typeof raw.mobile_number !== "string" || typeof raw.building_type !== "string") {
    throw new ValidationError("Missing or invalid registration fields.");
  }

  const email = raw.email.trim().toLowerCase();
  const company_name = raw.company_name.trim();
  const contact_person = raw.contact_person.trim();
  const designation = raw.designation.trim();
  const mobile_number = raw.mobile_number.trim();
  const building_type = raw.building_type.trim();

  if (!email || !company_name || !contact_person || !designation || !mobile_number || !building_type) {
    throw new ValidationError("Please fill in all required fields.");
  }

  if (email.length > MAX_FIELD_LENGTHS.email || !EMAIL_REGEX.test(email)) {
    throw new ValidationError("Please enter a valid email address.");
  }

  if (!MOBILE_REGEX.test(mobile_number)) {
    throw new ValidationError("Mobile number must be exactly 10 digits.");
  }

  if (!ALLOWED_BUILDING_TYPES.includes(building_type)) {
    throw new ValidationError("Invalid building type selected.");
  }

  let building_type_other: string | null = null;
  if (building_type === "other") {
    const otherRaw = typeof raw.building_type_other === "string" ? raw.building_type_other.trim() : "";
    if (!otherRaw) {
      throw new ValidationError("Please specify your building type.");
    }
    if (otherRaw.length > MAX_FIELD_LENGTHS.building_type_other) {
      throw new ValidationError("Building type specification is too long.");
    }
    building_type_other = otherRaw;
  }

  if (company_name.length > MAX_FIELD_LENGTHS.company_name) {
    throw new ValidationError("Company name is too long.");
  }
  if (contact_person.length > MAX_FIELD_LENGTHS.contact_person) {
    throw new ValidationError("Contact person name is too long.");
  }
  if (designation.length > MAX_FIELD_LENGTHS.designation) {
    throw new ValidationError("Designation is too long.");
  }

  return { email, company_name, contact_person, designation, mobile_number, building_type, building_type_other };
}

export type HandlerConfig = {
  supabaseUrl: string;
  serviceRoleKey: string;
  turnstileSecret: string;
};

export type HandlerDeps = {
  readConfig: () => HandlerConfig | null;
  createDb: (config: HandlerConfig) => RpcClient;
  verifyTurnstile: (token: unknown, secret: string, ip: string | null) => Promise<TurnstileResult>;
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export function createHandler(deps: HandlerDeps) {
  return async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
      if (req.method !== "POST") {
        return json({ error: "Method not allowed" }, 405);
      }

      const config = deps.readConfig();
      if (!config) {
        return json({ error: "Server configuration error" }, 500);
      }

      const db = deps.createDb(config);
      const ip = clientIpFromRequest(req);

      let withinLimit: boolean;
      try {
        withinLimit = await consumeRateLimit(db, await hashIp(ip));
      } catch {
        return json({ error: "Security check is temporarily unavailable. Please try again." }, 503);
      }
      if (!withinLimit) {
        return json({ error: "Too many attempts. Please wait a few minutes and try again." }, 429);
      }

      let body: { registration?: RegistrationData; turnstile_token?: unknown };
      try {
        body = await req.json();
      } catch {
        return json({ error: "Invalid request body." }, 400);
      }

      let validated: RegistrationData;
      try {
        validated = validateRegistration(body.registration as RegistrationData);
      } catch (e) {
        const msg = e instanceof ValidationError ? e.message : "Invalid registration data.";
        return json({ error: msg }, 400);
      }

      const turnstile = await deps.verifyTurnstile(body.turnstile_token, config.turnstileSecret, ip);
      if (!turnstile.ok) {
        if (turnstile.reason === "unavailable") {
          return json({ error: "Security check is temporarily unavailable. Please try again." }, 503);
        }
        return json({ error: "Security check failed or expired. Please complete it again." }, 403);
      }

      const { data: remaining, error: countError } = await db.rpc("get_remaining_spots", {});
      if (countError) {
        return json({ error: "Failed to check registration availability" }, 500);
      }
      if ((remaining as number) <= 0) {
        return json({ error: "Registration is full. All 99 spots have been claimed." }, 409);
      }

      const { data: registrationId, error: rpcError } = await db.rpc("try_claim_registration_slot", {
        p_email: validated.email,
        p_company_name: validated.company_name,
        p_contact_person: validated.contact_person,
        p_designation: validated.designation,
        p_mobile_number: validated.mobile_number,
        p_building_type: validated.building_type,
        p_building_type_other: validated.building_type_other,
        p_razorpay_order_id: null,
        p_razorpay_payment_id: null,
      });

      if (rpcError) {
        if (rpcError.message?.includes("REGISTRATION_FULL")) {
          return json({ error: "Registration is full. All 99 spots have been claimed." }, 409);
        }
        if (rpcError.code === "23505") {
          return json({ error: "This email or payment has already been registered." }, 409);
        }
        return json({ error: "Failed to save registration", details: rpcError.message }, 500);
      }

      return json({ success: true, registration_id: registrationId }, 200);
    } catch (err) {
      return json({ error: err instanceof Error ? err.message : "Unknown error" }, 500);
    }
  };
}
