import sample from "@/data/sample-robots.json";
import { getSupabase } from "@/lib/supabase";
import type { Property, RobotRecord, RobotStatus } from "@/lib/types";

/**
 * Reads the static registry ("seed"): which robots exist and where.
 * Uses Supabase when configured; otherwise falls back to the bundled sample
 * data so the app runs out of the box. Adjust table/column names to match
 * your seeded schema if you wire up Supabase.
 */
export async function getRobots(): Promise<RobotRecord[]> {
  const supabase = getSupabase();
  if (!supabase) return sample.robots as RobotRecord[];

  const { data, error } = await supabase.from("robots").select("*");
  if (error) throw error;
  return (data ?? []) as RobotRecord[];
}

export async function getProperties(): Promise<Property[]> {
  const supabase = getSupabase();
  if (!supabase) return sample.properties as Property[];

  const { data, error } = await supabase.from("properties").select("*");
  if (error) throw error;
  return (data ?? []) as Property[];
}

/**
 * PART 2: persist the LATEST computed status for a robot (status history is an
 * add-on, not required). No-ops when Supabase isn't configured so the rest of
 * the pipeline still runs locally.
 */
export async function saveRobotStatus(status: RobotStatus): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  void status;
  throw new Error("Not implemented: upsert the latest status into Supabase");
}

/** Reads back the latest persisted statuses to render on the dashboard. */
export async function getLatestStatuses(): Promise<RobotStatus[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  throw new Error("Not implemented: read latest statuses from Supabase");
}
