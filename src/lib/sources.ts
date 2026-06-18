import type { ComponentStatus, RobotRecord } from "@/lib/types";

/**
 * ============================================================================
 * PART 2 — LIVE STATUS SOURCES (build this)
 * ============================================================================
 *
 * The static registry (src/lib/db.ts) tells you what hardware exists. This
 * file is where you pull the *live* status of that hardware. You have a few
 * sources, with different characteristics — part of the task is deciding how
 * and how often to hit each one.
 *
 *  1. Undaunted RPi  — a live device you POLL over HTTP. It does NOT push
 *                      data to you. Connection details are provided at the
 *                      start of the segment.
 *  2. Robot API      — two endpoints: one cheap and safe to call frequently,
 *                      one resource-intensive (battery, temperature, etc.).
 *  3. Static DB      — for the components that don't report live, you may
 *                      treat the registry as the source of truth.
 *
 * These are stubs. Implement them (or restructure entirely — your call).
 */

/** TODO: poll the live Undaunted RPi for a component's status. */
export async function pollRpi(source: string): Promise<ComponentStatus> {
  void source;
  throw new Error("Not implemented: poll the live Undaunted RPi endpoint");
}

/** TODO: fetch robot status from the robot API (mind the cheap vs. expensive endpoints). */
export async function fetchRobotStatus(source: string): Promise<ComponentStatus> {
  void source;
  throw new Error("Not implemented: call the robot API");
}

/**
 * TODO: gather the live status of all four components for one robot.
 * Consider: what happens when a single source is slow or unreachable?
 */
export async function collectComponentStatuses(
  robot: RobotRecord,
): Promise<ComponentStatus[]> {
  void robot;
  throw new Error("Not implemented: collect all component statuses for a robot");
}
