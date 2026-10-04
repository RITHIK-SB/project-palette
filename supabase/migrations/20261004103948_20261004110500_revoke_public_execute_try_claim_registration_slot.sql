/*
# Revoke PUBLIC execution of try_claim_registration_slot (follow-up)

## Purpose
The previous migration revoked EXECUTE from `anon` and `authenticated`
directly, but Postgres grants EXECUTE to `PUBLIC` by default on every
function. The `anon` and `authenticated` roles inherit from `PUBLIC`, so
they could still call the function. This migration closes that gap by
revoking EXECUTE from `PUBLIC` as well.

## Security change
- REVOKE EXECUTE on `try_claim_registration_slot(...)` FROM `PUBLIC`.
- The `service_role` bypasses all permission checks (it has
  BYPASSRLS and superuser-level privileges), so the
  `verify-razorpay-payment` edge function — which uses
  `SUPABASE_SERVICE_ROLE_KEY` — is unaffected.
- `get_remaining_spots()` is intentionally left unchanged.

## Important notes
1. No Razorpay credentials, payment verification logic, or edge-function
   code is modified.
2. No registration UI, 99-limit logic, or existing RLS policies are
   changed.
3. Idempotent: REVOKE is safe to re-run.
*/

REVOKE EXECUTE ON FUNCTION public.try_claim_registration_slot(
  text, text, text, text, text, text, text, text, text
) FROM PUBLIC;
