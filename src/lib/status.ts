import type { ComponentStatus, RobotStatus } from "@/lib/types";

/**
 * ============================================================================
 * PART 2 — CORE TASK: is this robot online?
 * ============================================================================
 *
 * Given the live status of a robot's components, produce the single
 * robot-level answer: online or offline.
 *
 * Defining what state each component must be in for the robot to count as
 * "online" is the heart of the task. Make your logic explicit and easy to
 * point at — we'll discuss why you drew the lines where you did.
 *
 * Stretch: populate `offlineReasons` with which component(s) failed.
 */
export function aggregateRobotStatus(
  robotId: string,
  components: ComponentStatus[],
): RobotStatus {
  void components;
  throw new Error("Not implemented: decide whether the robot is online");

  // Suggested shape of the answer you return:
  // return { robotId, online, offlineReasons, components };
}
