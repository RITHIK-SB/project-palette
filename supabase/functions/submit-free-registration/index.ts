import { createClient } from "npm:@supabase/supabase-js@2";

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

function validateRegistration(raw: RegistrationData): RegistrationData {
  if (typeof raw.email !== "string" || typeof raw.company_name !== "string" ||
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

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: remaining, error: countError } = await supabase.rpc("get_remaining_spots");

    if (countError) {
      return new Response(JSON.stringify({ error: "Failed to check registration availability" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if ((remaining as number) <= 0) {
      return new Response(JSON.stringify({ error: "Registration is full. All 99 spots have been claimed." }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json() as { registration: RegistrationData };

    let validated: RegistrationData;
    try {
      validated = validateRegistration(body.registration);
    } catch (e) {
      const msg = e instanceof ValidationError ? e.message : "Invalid registration data.";
      return new Response(JSON.stringify({ error: msg }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: registrationId, error: rpcError } = await supabase.rpc("try_claim_registration_slot", {
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
        return new Response(
          JSON.stringify({ error: "Registration is full. All 99 spots have been claimed." }),
          {
            status: 409,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      if (rpcError.code === "23505") {
        return new Response(
          JSON.stringify({ error: "This email or payment has already been registered." }),
          {
            status: 409,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      return new Response(
        JSON.stringify({ error: "Failed to save registration", details: rpcError.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ success: true, registration_id: registrationId }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
