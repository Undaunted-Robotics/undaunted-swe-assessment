import sample from "@/data/sample-robots.json";
import { getSupabase } from "@/lib/supabase";
import type { Property, RobotRecord } from "@/lib/types";

/**
 * Reads the static registry ("DB"): which robots exist and where.
 *
 * If Supabase is configured it reads from there; otherwise it falls back to
 * the bundled sample dataset so the app runs out of the box. If you wire up
 * Supabase, adjust the table/column names to match your schema.
 */
export async function getRobots(): Promise<RobotRecord[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return sample.robots as RobotRecord[];
  }

  const { data, error } = await supabase.from("robots").select("*");
  if (error) throw error;
  return (data ?? []) as RobotRecord[];
}

export async function getProperties(): Promise<Property[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return sample.properties as Property[];
  }

  const { data, error } = await supabase.from("properties").select("*");
  if (error) throw error;
  return (data ?? []) as Property[];
}
