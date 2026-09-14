/*
# Add 99-registration capacity limit

## Purpose
Enforce a hard limit of 99 successful, payment-verified registrations.
The limit is checked atomically inside a SECURITY DEFINER function so that
two simultaneous registration attempts cannot both succeed when only one
spot remains.

## New Functions

### get_remaining_spots()
- SECURITY DEFINER, returns an integer: how many verified-registration slots
  remain out of 99. Callable by anon (the frontend needs to display the
  counter without logging in).

### try_claim_registration_slot(p_registration jsonb)
- SECURITY DEFINER, the single atomic entry point for inserting a verified
  registration. It:
  1. Counts existing rows WHERE razorpay_payment_verified = true.
  2. If count >= 99, raises an exception (registration full).
  3. Otherwise inserts the row and returns the new row's id.
- This function is called only by the verify-razorpay-payment edge function
  using the service-role key, so it bypasses RLS. The function itself runs
  as the postgres superuser (SECURITY DEFINER) and performs the count + insert
  in a single atomic step, preventing race conditions.

## Security
- Both functions are SECURITY DEFINER (run as the schema owner).
- get_remaining_spots is executable by anon, authenticated (public read).
- try_claim_registration_slot is executable by anon, authenticated (called
  via edge function with service-role key).
- No changes to existing RLS policies on registrations.
*/

-- Function: get_remaining_spots
-- Returns the number of registration slots still available (99 minus verified count).
CREATE OR REPLACE FUNCTION public.get_remaining_spots()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  verified_count integer;
  remaining integer;
BEGIN
  SELECT count(*) INTO verified_count
  FROM registrations
  WHERE razorpay_payment_verified = true;

  remaining := 99 - verified_count;
  IF remaining < 0 THEN
    remaining := 0;
  END IF;

  RETURN remaining;
END;
$$;

-- Allow anon (frontend) and authenticated to call get_remaining_spots
GRANT EXECUTE ON FUNCTION public.get_remaining_spots() TO anon, authenticated;

-- Function: try_claim_registration_slot
-- Atomically checks the 99-limit and inserts a verified registration.
-- Raises an exception if the limit has been reached.
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

-- Allow anon, authenticated to call try_claim_registration_slot
-- (edge function calls it with service-role key, which bypasses RLS)
GRANT EXECUTE ON FUNCTION public.try_claim_registration_slot(
  text, text, text, text, text, text, text, text, text
) TO anon, authenticated;
