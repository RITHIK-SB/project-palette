import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Registration = {
  id: string;
  company_name: string;
  contact_person: string;
  designation: string;
  mobile_number: string;
  email: string;
  building_type: string;
  building_type_other: string | null;
  status: "pending" | "contacted" | "completed";
  created_at: string;
};

export type RegistrationInput = {
  company_name: string;
  contact_person: string;
  designation: string;
  mobile_number: string;
  email: string;
  building_type: string;
  building_type_other?: string | null;
};
