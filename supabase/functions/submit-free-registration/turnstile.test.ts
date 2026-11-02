import { assertEquals, assertStrictEquals } from "jsr:@std/assert@1";
import { verifyTurnstileToken } from "./turnstile.ts";

const okResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

Deno.test("rejects a missing or oversized token without calling Cloudflare", async () => {
  let calls = 0;
  const fetchFn = () => {
    calls++;
    return Promise.resolve(okResponse({ success: true }));
  };
  assertEquals(await verifyTurnstileToken(undefined, "secret", null, fetchFn), { ok: false, reason: "missing" });
  assertEquals(await verifyTurnstileToken("", "secret", null, fetchFn), { ok: false, reason: "missing" });
  assertEquals(await verifyTurnstileToken(42, "secret", null, fetchFn), { ok: false, reason: "missing" });
  assertEquals(
    await verifyTurnstileToken("x".repeat(2049), "secret", null, fetchFn),
    { ok: false, reason: "missing" },
  );
  assertEquals(calls, 0);
});

Deno.test("accepts a token Cloudflare reports as successful and sends secret, token and IP", async () => {
  let sentBody = "";
  const fetchFn = (_url: string, init: RequestInit) => {
    sentBody = String(init.body);
    return Promise.resolve(okResponse({ success: true }));
  };
  const result = await verifyTurnstileToken("tok-abc", "shh-secret", "203.0.113.7", fetchFn);
  assertEquals(result, { ok: true });
  const params = new URLSearchParams(sentBody);
  assertEquals(params.get("secret"), "shh-secret");
  assertEquals(params.get("response"), "tok-abc");
  assertEquals(params.get("remoteip"), "203.0.113.7");
});

Deno.test("rejects invalid, expired or reused tokens reported by Cloudflare", async () => {
  const reused = () =>
    Promise.resolve(okResponse({ success: false, "error-codes": ["timeout-or-duplicate"] }));
  assertEquals(await verifyTurnstileToken("tok", "s", null, reused), { ok: false, reason: "rejected" });

  const invalid = () =>
    Promise.resolve(okResponse({ success: false, "error-codes": ["invalid-input-response"] }));
  assertEquals(await verifyTurnstileToken("tok", "s", null, invalid), { ok: false, reason: "rejected" });

  const malformed = () => Promise.resolve(okResponse({ success: "true" }));
  assertEquals(await verifyTurnstileToken("tok", "s", null, malformed), { ok: false, reason: "rejected" });
});

Deno.test("fails closed as unavailable when Cloudflare cannot be reached or errors", async () => {
  const networkDown = () => Promise.reject(new TypeError("network down"));
  assertEquals(await verifyTurnstileToken("tok", "s", null, networkDown), { ok: false, reason: "unavailable" });

  const serverError = () => Promise.resolve(new Response("oops", { status: 500 }));
  assertEquals(await verifyTurnstileToken("tok", "s", null, serverError), { ok: false, reason: "unavailable" });

  const notJson = () => Promise.resolve(new Response("<html>", { status: 200 }));
  assertEquals(await verifyTurnstileToken("tok", "s", null, notJson), { ok: false, reason: "unavailable" });
});

Deno.test("omits remoteip when the client IP is unknown", async () => {
  let sentBody = "";
  const fetchFn = (_url: string, init: RequestInit) => {
    sentBody = String(init.body);
    return Promise.resolve(okResponse({ success: true }));
  };
  await verifyTurnstileToken("tok", "s", null, fetchFn);
  assertStrictEquals(new URLSearchParams(sentBody).has("remoteip"), false);
});
