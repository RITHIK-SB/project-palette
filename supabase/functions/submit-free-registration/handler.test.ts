import { assertEquals } from "jsr:@std/assert@1";
import { createHandler, type HandlerConfig } from "./handler.ts";
import { type RpcClient } from "./rate-limit.ts";
import { type TurnstileResult } from "./turnstile.ts";

const config: HandlerConfig = {
  supabaseUrl: "https://project.test",
  serviceRoleKey: "service-key",
  turnstileSecret: "turnstile-secret",
};

const validBody = {
  turnstile_token: "good-token",
  registration: {
    email: "ops@example.com",
    company_name: "Acme Facilities",
    contact_person: "Asha Rao",
    designation: "Facility Manager",
    mobile_number: "9876543210",
    building_type: "other",
    building_type_other: "Data centre",
  },
};

type FakeOptions = {
  rateLimitAllows?: (callIndex: number) => boolean;
  rateLimitError?: string;
  remaining?: number;
  claimError?: { message: string; code?: string };
};

function fakeDb(options: FakeOptions = {}) {
  const claims: Record<string, unknown>[] = [];
  let rateLimitCalls = 0;
  const db: RpcClient = {
    rpc: (fn, args) => {
      if (fn === "consume_registration_rate_limit") {
        const index = rateLimitCalls++;
        if (options.rateLimitError) {
          return Promise.resolve({ data: null, error: { message: options.rateLimitError } });
        }
        const allowed = options.rateLimitAllows ? options.rateLimitAllows(index) : true;
        return Promise.resolve({ data: allowed, error: null });
      }
      if (fn === "get_remaining_spots") {
        return Promise.resolve({ data: options.remaining ?? 5, error: null });
      }
      if (fn === "try_claim_registration_slot") {
        claims.push(args);
        if (options.claimError) {
          return Promise.resolve({ data: null, error: options.claimError });
        }
        return Promise.resolve({ data: `reg-${claims.length}`, error: null });
      }
      return Promise.resolve({ data: null, error: { message: `unexpected rpc ${fn}` } });
    },
  };
  return { db, claims, rateLimitCalls: () => rateLimitCalls };
}

function build(
  options: FakeOptions = {},
  turnstile: TurnstileResult = { ok: true },
  overrides: { readConfig?: HandlerConfig | null } = {},
) {
  const fake = fakeDb(options);
  const verifyCalls: unknown[] = [];
  const handler = createHandler({
    readConfig: () => (overrides.readConfig === undefined ? config : overrides.readConfig),
    createDb: () => fake.db,
    verifyTurnstile: (token) => {
      verifyCalls.push(token);
      return Promise.resolve(turnstile);
    },
  });
  return { handler, fake, verifyCalls };
}

function post(body: unknown, ip = "203.0.113.50"): Request {
  return new Request("https://example.test/functions/v1/submit-free-registration", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

Deno.test("accepts a valid registration with a valid Turnstile token and claims one slot", async () => {
  const { handler, fake, verifyCalls } = build();
  const res = await handler(post(validBody));
  assertEquals(res.status, 200);
  assertEquals((await res.json()).success, true);
  assertEquals(verifyCalls, ["good-token"]);
  assertEquals(fake.claims.length, 1);
  assertEquals(fake.claims[0].p_email, "ops@example.com");
  assertEquals(fake.claims[0].p_razorpay_payment_id, null);
});

Deno.test("rejects a missing Turnstile token without claiming a slot", async () => {
  const { handler, fake } = build({}, { ok: false, reason: "missing" });
  const { turnstile_token: _omit, ...withoutToken } = validBody;
  const res = await handler(post(withoutToken));
  assertEquals(res.status, 403);
  assertEquals(fake.claims.length, 0);
});

Deno.test("rejects an invalid, expired or reused Turnstile token without claiming a slot", async () => {
  const { handler, fake } = build({}, { ok: false, reason: "rejected" });
  const res = await handler(post({ ...validBody, turnstile_token: "reused-token" }));
  assertEquals(res.status, 403);
  assertEquals((await res.json()).error, "Security check failed or expired. Please complete it again.");
  assertEquals(fake.claims.length, 0);
});

Deno.test("fails closed with 503 when Turnstile is unreachable, without claiming a slot", async () => {
  const { handler, fake } = build({}, { ok: false, reason: "unavailable" });
  const res = await handler(post(validBody));
  assertEquals(res.status, 503);
  assertEquals(fake.claims.length, 0);
});

Deno.test("blocks requests over the per-IP limit before Turnstile or claims run", async () => {
  const { handler, fake, verifyCalls } = build({ rateLimitAllows: () => false });
  const res = await handler(post(validBody));
  assertEquals(res.status, 429);
  assertEquals(verifyCalls.length, 0);
  assertEquals(fake.claims.length, 0);
});

Deno.test("fails closed with 503 when the rate-limit counter errors", async () => {
  const { handler, fake, verifyCalls } = build({ rateLimitError: "db down" });
  const res = await handler(post(validBody));
  assertEquals(res.status, 503);
  assertEquals(verifyCalls.length, 0);
  assertEquals(fake.claims.length, 0);
});

Deno.test("repeated requests from one IP: only the first ten reach the claim", async () => {
  const { handler, fake } = build({ rateLimitAllows: (index) => index < 10 });
  const statuses: number[] = [];
  for (let i = 0; i < 12; i++) {
    statuses.push((await handler(post(validBody))).status);
  }
  assertEquals(statuses.slice(0, 10).every((s) => s === 200), true);
  assertEquals(statuses.filter((s) => s === 429).length, 2);
  assertEquals(fake.claims.length, 10);
});

Deno.test("concurrent requests cannot claim more slots than the counter allows", async () => {
  const counter = { used: 0 };
  const { handler, fake } = build({
    rateLimitAllows: () => {
      counter.used++;
      return counter.used <= 10;
    },
  });
  const responses = await Promise.all(Array.from({ length: 15 }, () => handler(post(validBody))));
  const statuses = responses.map((r) => r.status);
  assertEquals(statuses.filter((s) => s === 200).length, 10);
  assertEquals(statuses.filter((s) => s === 429).length, 5);
  assertEquals(fake.claims.length, 10);
});

Deno.test("rejects malformed JSON and invalid registration data before Turnstile", async () => {
  const { handler, fake, verifyCalls } = build();
  assertEquals((await handler(post("{not json"))).status, 400);
  assertEquals((await handler(post({ turnstile_token: "t" }))).status, 400);
  assertEquals(
    (await handler(post({ ...validBody, registration: { ...validBody.registration, mobile_number: "123" } }))).status,
    400,
  );
  assertEquals(verifyCalls.length, 0);
  assertEquals(fake.claims.length, 0);
});

Deno.test("returns 409 when no spots remain or the database reports the limit", async () => {
  const full = build({ remaining: 0 });
  assertEquals((await full.handler(post(validBody))).status, 409);
  assertEquals(full.fake.claims.length, 0);

  const raced = build({ claimError: { message: "REGISTRATION_FULL" } });
  assertEquals((await raced.handler(post(validBody))).status, 409);
});

Deno.test("returns 500 without calling any dependency when server configuration is missing", async () => {
  const { handler, fake } = build({}, { ok: true }, { readConfig: null });
  assertEquals((await handler(post(validBody))).status, 500);
  assertEquals(fake.rateLimitCalls(), 0);
});

Deno.test("rejects non-POST requests and answers CORS preflight", async () => {
  const { handler } = build();
  assertEquals((await handler(new Request("https://example.test/", { method: "GET" }))).status, 405);
  assertEquals((await handler(new Request("https://example.test/", { method: "OPTIONS" }))).status, 200);
});
