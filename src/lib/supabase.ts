import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Returns a Supabase client when env vars are configured, otherwise `null`.
 *
 * When it returns `null`, the data layer falls back to the bundled sample
 * dataset (see src/lib/db.ts), so the app runs with zero configuration.
 * To use a real database, copy `.env.example` to `.env.local` and fill in:
 *
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!client) client = createClient(url, key);
  return client;
}
