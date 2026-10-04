/*
# Revoke direct public/anon execution of try_claim_registration_slot

## Purpose
Close a critical security gap: the SECURITY DEFINER function
`try_claim_registration_slot(...)` was callable by the `anon` and
`authenticated` roles through the Supabase Data API, allowing anyone to
insert a payment-verified registration row directly without going through
the Razorpay payment verification edge function.

## Security change
- REVOKE EXECUTE on `try_claim_registration_slot(text, text, text, text, text, text, text, text, text)`
  FROM `anon` and `authenticated`.
- The function remains callable by the `service_role` (which bypasses RLS
  and has superuser-level privileges), so the legitimate server-side flow
  in the `verify-razorpay-payment` edge function continues to work
  unchanged. That edge function creates a Supabase client with
  `SUPABASE_SERVICE_ROLE_KEY`, so its `supabase.rpc("try_claim_registration_slot", …)`
  call is unaffected by this permission change.
- `get_remaining_spots()` is intentionally left unchanged — the frontend
  counter needs it to remain publicly callable by `anon`.

## Important notes
1. No Razorpay credentials, payment verification logic, or Razorpay
   edge-function code is modified.
2. No registration UI, 99-limit logic, or existing RLS policies are
   changed.
3. The migration is idempotent: REVOKE is safe to re-run.
*/

REVOKE EXECUTE ON FUNCTION public.try_claim_registration_slot(
  text, text, text, text, text, text, text, text, text
) FROM anon, authenticated;
