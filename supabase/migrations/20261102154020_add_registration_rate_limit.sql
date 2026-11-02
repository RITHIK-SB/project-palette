/*
# Add persistent per-IP rate limiting for free registrations

## Purpose
Give submit-free-registration a database-backed counter of submission attempts
per client IP, so automated clients cannot flood the endpoint. The counter is
shared across all edge function instances, so it survives restarts and cannot
be reset by hitting a different instance.

## New objects
1. Table `registration_rate_limits`
   - `ip_hash` (text): SHA-256 hex of the client IP. Raw IPs are not stored.
   - `window_start` (timestamptz): start of a fixed time window.
   - `hits` (integer): number of attempts recorded in that window.
   - Primary key (ip_hash, window_start).
2. Function `consume_registration_rate_limit(p_ip_hash, p_limit, p_window_seconds)`
   - Atomically increments the counter for the current window and returns
     true while the count is within the limit, false once it is exceeded.
   - Deletes counters from windows older than one window length, so the table
     stays small.

## Security changes
1. RLS is enabled on `registration_rate_limits` with no policies, so anon and
   authenticated clients cannot read or write it directly.
2. All privileges on the table are revoked from PUBLIC, anon and authenticated.
3. The function is SECURITY DEFINER with a fixed search_path. EXECUTE is revoked
   from PUBLIC, anon and authenticated and granted only to service_role, which
   the edge function uses.

## Important notes
1. Concurrency: a single INSERT ... ON CONFLICT DO UPDATE statement increments the
   counter atomically, so concurrent requests from the same IP are counted
   correctly without application-level locking.
2. Fixed windows allow up to twice the limit across a window boundary. This is
   accepted for a registration form.
3. Idempotent: all statements use IF NOT EXISTS or CREATE OR REPLACE.
*/

CREATE TABLE IF NOT EXISTS public.registration_rate_limits (
  ip_hash text NOT NULL,
  window_start timestamptz NOT NULL,
  hits integer NOT NULL DEFAULT 0 CHECK (hits >= 0),
  PRIMARY KEY (ip_hash, window_start)
);

CREATE INDEX IF NOT EXISTS registration_rate_limits_window_start_idx
  ON public.registration_rate_limits (window_start);

ALTER TABLE public.registration_rate_limits ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.registration_rate_limits FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.consume_registration_rate_limit(
  p_ip_hash text,
  p_limit integer,
  p_window_seconds integer
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_window_start timestamptz;
  v_hits integer;
BEGIN
  IF p_ip_hash IS NULL OR p_limit < 1 OR p_window_seconds < 1 THEN
    RAISE EXCEPTION 'INVALID_RATE_LIMIT_ARGUMENTS';
  END IF;

  v_window_start := to_timestamp(
    floor(extract(epoch FROM now()) / p_window_seconds) * p_window_seconds
  );

  INSERT INTO public.registration_rate_limits AS r (ip_hash, window_start, hits)
  VALUES (p_ip_hash, v_window_start, 1)
  ON CONFLICT (ip_hash, window_start)
  DO UPDATE SET hits = r.hits + 1
  RETURNING r.hits INTO v_hits;

  DELETE FROM public.registration_rate_limits
  WHERE window_start < now() - make_interval(secs => p_window_seconds);

  RETURN v_hits <= p_limit;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.consume_registration_rate_limit(text, integer, integer)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_registration_rate_limit(text, integer, integer)
  TO service_role;
