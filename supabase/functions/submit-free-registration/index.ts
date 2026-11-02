import { createClient } from "npm:@supabase/supabase-js@2";
import { createHandler } from "./handler.ts";
import { verifyTurnstileToken } from "./turnstile.ts";

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
