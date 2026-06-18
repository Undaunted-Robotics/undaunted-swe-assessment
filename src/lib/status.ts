import type { ComponentStatus, RobotStatus } from "@/lib/types";

/**
 * ============================================================================
 * PART 2 — CORE TASK: is this robot online?
 * ============================================================================
 *
 * Given a robot's normalized component statuses, produce the single
 * robot-level answer: online or offline.
 *
 * Defining what "online" means is the heart of the task — and it should reuse
 * the definition you designed in Part 1 (architecture). Make the rule explicit
 * and easy to point at.
 *
 * Watch for the traps:
 *   - The dog house RPi disconnects BY DESIGN while the robot is on patrol.
 *     "offline" is not "disconnected" — this isn't a naive boolean AND.
 *   - A component being "unknown/unreachable" is not the same as "offline".
 *
 * Stretch: populate `offlineReasons` with which component(s) failed.
 */
export function aggregateRobotStatus(
  robotId: string,
  components: ComponentStatus[],
): RobotStatus {
  void robotId;
  void components;
  throw new Error("Not implemented: decide whether the robot is online");

  // Suggested shape of the answer you return:
  // return { robotId, online, offlineReasons, components, updatedAt };
}
