import { assertEquals } from "jsr:@std/assert@1";
import { createClient } from "npm:@supabase/supabase-js@2";
import { consumeRateLimit, RATE_LIMIT_MAX_ATTEMPTS, RATE_LIMIT_WINDOW_SECONDS } from "./rate-limit.ts";

// Opt-in: runs only with RUN_DB_TESTS=1 plus SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment.
const enabled = Deno.env.get("RUN_DB_TESTS") === "1" &&
  !!Deno.env.get("SUPABASE_URL") && !!Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

Deno.test({
  name: "concurrent counter calls for one IP grant exactly the limit",
  ignore: !enabled,
  fn: async () => {
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const db = { rpc: (fn: string, args: Record<string, unknown>) => supabase.rpc(fn, args) };
    const ipHash = `test-concurrency-${crypto.randomUUID()}`;

    const results = await Promise.all(
      Array.from({ length: RATE_LIMIT_MAX_ATTEMPTS * 2 }, () => consumeRateLimit(db, ipHash)),
    );

    assertEquals(results.filter(Boolean).length, RATE_LIMIT_MAX_ATTEMPTS);
    assertEquals(RATE_LIMIT_WINDOW_SECONDS > 0, true);
  },
});
