/*
# Create registrations and admins tables

## Purpose
Stores free AMC registration submissions from the public landing page form,
and tracks which Supabase auth users are authorized admins who can view those
submissions in the admin panel.

## New Tables

### registrations
- `id` (uuid, primary key)
- `company_name` (text, not null) — registered company name
- `contact_person` (text, not null) — full name of the contact person
- `designation` (text, not null) — job title / role
- `mobile_number` (text, not null) — 10-digit phone number
- `email` (text, not null) — official email address (unique — prevents duplicate registrations)
- `building_type` (text, not null) — facility type: institutions, hospitals, industries, warehouses, commercial, high-rise-residential, other
- `building_type_other` (text, nullable) — free-text description when building_type = 'other'
- `status` (text, not null, default 'pending') — processing status: pending, contacted, completed
- `created_at` (timestamptz, default now()) — when the registration was submitted

### admins
- `id` (uuid, primary key, references auth.users) — links to the Supabase auth user
- `email` (text, not null, unique) — the admin's email for easy lookup
- `created_at` (timestamptz, default now()) — when admin access was granted

## Security (Row Level Security)

### registrations
- RLS enabled.
- INSERT: allowed for `anon, authenticated` (public form submission — no login required).
- SELECT/UPDATE/DELETE: allowed for `authenticated` users who exist in the `admins` table only.
  This ensures only authorized MAHA BINU employees can view or manage registrations.

### admins
- RLS enabled.
- SELECT: allowed for `authenticated` users who exist in the `admins` table (an admin can
  check their own admin status).
- INSERT/UPDATE/DELETE: no policies — admin management is done via the Supabase dashboard
  or a service-role script, not from the client.

## Important Notes
1. The `email` column on `registrations` has a UNIQUE constraint to prevent duplicate
   registrations from the same email address.
2. Admin users must first be created via Supabase Auth (email/password), then added to
   the `admins` table to gain panel access. This two-step process keeps auth and
   authorization separate.
3. The `building_type` column is validated via a CHECK constraint to only accept
   the predefined facility types.
*/

-- Registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_person text NOT NULL,
  designation text NOT NULL,
  mobile_number text NOT NULL,
  email text NOT NULL,
  building_type text NOT NULL CHECK (
    building_type IN ('institutions', 'hospitals', 'industries', 'warehouses', 'commercial', 'high-rise-residential', 'other')
  ),
  building_type_other text,
  status text NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'contacted', 'completed')
  ),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Prevent duplicate registrations from the same email
CREATE UNIQUE INDEX IF NOT EXISTS registrations_email_unique ON registrations (email);

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Registrations policies

-- Public INSERT (no login required to submit the form)
DROP POLICY IF EXISTS "public_insert_registration" ON registrations;
CREATE POLICY "public_insert_registration"
  ON registrations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admin-only SELECT (only authorized employees can view registrations)
DROP POLICY IF EXISTS "admin_select_registrations" ON registrations;
CREATE POLICY "admin_select_registrations"
  ON registrations FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid())
  );

-- Admin-only UPDATE (only authorized employees can update registration status)
DROP POLICY IF EXISTS "admin_update_registrations" ON registrations;
CREATE POLICY "admin_update_registrations"
  ON registrations FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid())
  );

-- Admin-only DELETE (only authorized employees can delete registrations)
DROP POLICY IF EXISTS "admin_delete_registrations" ON registrations;
CREATE POLICY "admin_delete_registrations"
  ON registrations FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid())
  );

-- Admins policies

-- An authenticated user can check if they are an admin (only sees their own row)
DROP POLICY IF EXISTS "admin_select_self" ON admins;
CREATE POLICY "admin_select_self"
  ON admins FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Index for admin lookups
CREATE INDEX IF NOT EXISTS admins_id_idx ON admins (id);
