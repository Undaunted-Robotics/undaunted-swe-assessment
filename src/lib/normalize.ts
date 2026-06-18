import type {
  ComponentStatus,
  HeartbeatResponse,
  TelemetryResponse,
} from "@/lib/types";

/**
 * ============================================================================
 * PART 2 — NORMALIZE: raw API responses → a consistent internal shape
 * ============================================================================
 *
 * Merge the cheap connectivity signal (/heartbeat) with the expensive detail
 * (/telemetry, which may be missing if it was unreachable) into a clean set of
 * ComponentStatus per robot.
 *
 * A curveball robot ships dirty data — a missing field, a different unit, an
 * extra sensor. A real normalization layer absorbs that without a rewrite.
 * Note that telemetry may be `null` when the expensive source is unavailable:
 * "unknown" is not the same as "offline".
 *
 * Returns a map of robotId -> the robot's component statuses.
 */
export function normalize(
  heartbeat: HeartbeatResponse,
  telemetry: TelemetryResponse | null,
): Map<string, ComponentStatus[]> {
  void heartbeat;
  void telemetry;
  throw new Error("Not implemented: normalize raw API data per robot");
}
