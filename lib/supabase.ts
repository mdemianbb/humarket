import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

// Base de datos de la hackathon (solo lectura)
const readOnlyUrl = process.env.NEXT_PUBLIC_SUPABASE_READONLY_URL;
const readOnlyKey = process.env.NEXT_PUBLIC_SUPABASE_READONLY_ANON_KEY;
export const supabaseReadOnly: SupabaseClient | null =
	readOnlyUrl && readOnlyKey ? createClient(readOnlyUrl, readOnlyKey) : null;

// Vuestra base (lectura/escritura) — datos ficticios, app, etc.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
