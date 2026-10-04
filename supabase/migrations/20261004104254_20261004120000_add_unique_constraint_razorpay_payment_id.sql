/*
# Add UNIQUE constraint on razorpay_payment_id

## Purpose
Prevent the same Razorpay payment from being used for more than one
registration. Even if a caller somehow bypasses the edge function's
server-side payment checks, the database will reject a duplicate
payment_id with a 23505 unique-violation error.

## Security change
- Add a UNIQUE constraint on `registrations.razorpay_payment_id`.
- The column remains nullable (existing rows and the capacity function
  insert it for every new verified registration, so NULLs are not an
  issue for the constraint).
- No changes to RLS policies, the 99-limit logic, or the RPC permissions
  applied in the previous migration.

## Important notes
1. No data is lost — the constraint is additive.
2. The edge function's existing `rpcError.code === "23505"` handler
   already returns a 409 conflict, so a duplicate payment ID will surface
   as a readable error rather than a crash.
3. Idempotent: uses IF NOT EXISTS via DO block.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'registrations_razorpay_payment_id_unique'
  ) THEN
    ALTER TABLE registrations
      ADD CONSTRAINT registrations_razorpay_payment_id_unique
      UNIQUE (razorpay_payment_id);
  END IF;
END $$;
