import { assertEquals, assertNotEquals, assertRejects } from "jsr:@std/assert@1";
import {
  clientIpFromRequest,
  consumeRateLimit,
  hashIp,
  RATE_LIMIT_MAX_ATTEMPTS,
  RATE_LIMIT_WINDOW_SECONDS,
  type RpcClient,
} from "./rate-limit.ts";

const requestWithForwardedFor = (value: string | null) => {
  const headers = new Headers();
  if (value !== null) headers.set("x-forwarded-for", value);
  return new Request("https://example.test/", { method: "POST", headers });
};

Deno.test("uses only the last X-Forwarded-For hop, ignoring client-supplied earlier hops", () => {
  assertEquals(clientIpFromRequest(requestWithForwardedFor("198.51.100.1, 203.0.113.9")), "203.0.113.9");
  assertEquals(clientIpFromRequest(requestWithForwardedFor("10.0.0.1")), "10.0.0.1");
});

Deno.test("returns null when the forwarded address is missing or malformed", () => {
  assertEquals(clientIpFromRequest(requestWithForwardedFor(null)), null);
  assertEquals(clientIpFromRequest(requestWithForwardedFor("not an ip; drop table")), null);
  assertEquals(clientIpFromRequest(requestWithForwardedFor("")), null);
});

Deno.test("hashes IPs deterministically without storing the raw address", async () => {
  const first = await hashIp("203.0.113.9");
  const second = await hashIp("203.0.113.9");
  assertEquals(first, second);
  assertEquals(first.length, 64);
  assertNotEquals(first, "203.0.113.9");
  assertNotEquals(await hashIp("203.0.113.10"), first);
  assertEquals(await hashIp(null), await hashIp(null));
});

Deno.test("passes the configured limit and window to the database counter", async () => {
  let captured: Record<string, unknown> = {};
  const db: RpcClient = {
    rpc: (fn, args) => {
      assertEquals(fn, "consume_registration_rate_limit");
      captured = args;
      return Promise.resolve({ data: true, error: null });
    },
  };
  assertEquals(await consumeRateLimit(db, "abc"), true);
  assertEquals(captured, {
    p_ip_hash: "abc",
    p_limit: RATE_LIMIT_MAX_ATTEMPTS,
    p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
  });
});

Deno.test("returns the database decision and throws when the counter fails", async () => {
  const denying: RpcClient = { rpc: () => Promise.resolve({ data: false, error: null }) };
  assertEquals(await consumeRateLimit(denying, "abc"), false);

  const failing: RpcClient = { rpc: () => Promise.resolve({ data: null, error: { message: "db down" } }) };
  await assertRejects(() => consumeRateLimit(failing, "abc"), Error, "db down");

  const odd: RpcClient = { rpc: () => Promise.resolve({ data: "maybe", error: null }) };
  await assertRejects(() => consumeRateLimit(odd, "abc"));
});
