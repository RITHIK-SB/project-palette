/*
# Add Razorpay payment columns to registrations

## Purpose
Support the ₹99 Razorpay payment flow. After payment verification on the server,
the edge function inserts the registration row using the service-role key, so the
public anon INSERT policy is no longer needed and is removed to prevent bypassing
payment verification.

## Changes to existing tables

### registrations
- `razorpay_order_id` (text, nullable) — Razorpay order ID created at checkout start
- `razorpay_payment_id` (text, nullable) — Razorpay payment ID after successful verification
- `razorpay_payment_verified` (boolean, not null, default false) — whether the payment signature was server-verified

## Security changes
- DROP the `public_insert_registration` policy (anon/authenticated INSERT).
  Registrations are now inserted only by the `verify-razorpay-payment` edge function
  using the service-role key, which bypasses RLS. This ensures no registration can
  be created without a verified ₹99 payment.
- All existing SELECT/UPDATE/DELETE admin-only policies remain unchanged.

## Important notes
1. No data is lost — existing rows get NULL for the new nullable columns and
   `false` for the boolean default.
2. The admin dashboard continues to work unchanged — it reads via authenticated
   admin-only SELECT policies.
3. The unique email constraint remains in place, preventing duplicate registrations.
*/

ALTER TABLE registrations
  ADD COLUMN IF NOT EXISTS razorpay_order_id text,
  ADD COLUMN IF NOT EXISTS razorpay_payment_id text,
  ADD COLUMN IF NOT EXISTS razorpay_payment_verified boolean NOT NULL DEFAULT false;

DROP POLICY IF EXISTS "public_insert_registration" ON registrations;
