import { createClient } from "npm:@supabase/supabase-js@2";
import { createHandler } from "./handler.ts";
import { verifyTurnstileToken } from "./turnstile.ts";

// Without TURNSTILE_SECRET_KEY, readConfig returns null and every request fails closed with 500.
console.log("submit-free-registration: handler with Turnstile and rate limiting loaded");
Deno.serve(
  createHandler({
    readConfig: () => {
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
      if (!supabaseUrl || !serviceRoleKey || !turnstileSecret) {
        return null;
      }
      return { supabaseUrl, serviceRoleKey, turnstileSecret };
    },
    createDb: ({ supabaseUrl, serviceRoleKey }) => createClient(supabaseUrl, serviceRoleKey),
    verifyTurnstile: verifyTurnstileToken,
  }),
);
