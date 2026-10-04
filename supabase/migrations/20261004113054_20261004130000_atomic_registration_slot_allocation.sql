/*
# Make try_claim_registration_slot atomic via advisory lock

## Purpose
Close a race condition in `try_claim_registration_slot()`: the current
implementation does a SELECT count(*) followed by an INSERT as two
separate statements. Two concurrent calls can both read the same count
(e.g. 98), both pass the `< 99` check, and both insert — exceeding the
99-registration limit.

## Change
- Recreate `try_claim_registration_slot(...)` with an identical signature
  and body, adding `PERFORM pg_advisory_xact_lock(...)` as the first
  statement. This acquires a transaction-level exclusive advisory lock
  that serializes concurrent calls to this function only. The lock is
  automatically released when the surrounding transaction commits or
  rolls back.
- `CREATE OR REPLACE FUNCTION` preserves all existing GRANT/REVOKE
  state, so `try_claim_registration_slot` remains non-executable by
  anon, authenticated, and PUBLIC (execute_roles: []). Only the
  service_role (used by the verify-razorpay-payment edge function)
  can call it.
- `get_remaining_spots()` is not modified.
- No changes to Razorpay verification, payment logic, email flow,
  admin UI, frontend, or registration fields.

## Important notes
1. The advisory lock key is a stable hash of the function name, so it
   only blocks other concurrent calls to this same function — it does
   not block unrelated reads or writes to the registrations table.
2. The 99-limit logic and error codes are identical to the previous
   version.
3. Idempotent: CREATE OR REPLACE is safe to re-run.
*/

CREATE OR REPLACE FUNCTION public.try_claim_registration_slot(
  p_email text,
  p_company_name text,
  p_contact_person text,
  p_designation text,
  p_mobile_number text,
  p_building_type text,
  p_building_type_other text,
  p_razorpay_order_id text,
  p_razorpay_payment_id text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  verified_count integer;
  new_id uuid;
BEGIN
  -- Serialize concurrent calls so the count + insert is atomic.
  -- The lock is auto-released at transaction end.
  PERFORM pg_advisory_xact_lock(hashtext('try_claim_registration_slot'));

  SELECT count(*) INTO verified_count
  FROM registrations
  WHERE razorpay_payment_verified = true;

  IF verified_count >= 99 THEN
    RAISE EXCEPTION 'REGISTRATION_FULL'
      USING ERRCODE = 'check_violation';
  END IF;

  INSERT INTO registrations (
    email,
    company_name,
    contact_person,
    designation,
    mobile_number,
    building_type,
    building_type_other,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_payment_verified
  )
  VALUES (
    p_email,
    p_company_name,
    p_contact_person,
    p_designation,
    p_mobile_number,
    p_building_type,
    p_building_type_other,
    p_razorpay_order_id,
    p_razorpay_payment_id,
    true
  )
  RETURNING id INTO new_id;

  RETURN new_id;
END;
$$;
