/**
 * Domain types for the Undaunted monitoring system.
 *
 * These describe the *shape* of the system, not the rules. Deciding what
 * "online" means for each component (and for a robot as a whole) is part of
 * the Part 2 task — see src/lib/status.ts.
 */

/** The four component types that make up one deployed robot. */
export type ComponentKind =
  | "robot" // the Unitree Go2 quadruped itself
  | "cellularRouter" // OpenWRT router in the security payload
  | "securityPayloadRpi" // Raspberry Pi in the payload (+ sensors)
  | "dogHouseRpi"; // Raspberry Pi controlling the charging dog house

/** Sensors attached to the security payload RPi. */
export type SensorKind = "camera" | "speaker" | "mic" | "lights";

/** A property/site where robots are deployed. */
export interface Property {
  id: string;
  name: string;
  address?: string;
}

/**
 * A reference to a single component within a robot's hardware stack.
 * `source` is a hint for where its live status comes from — left loose on
 * purpose, since wiring up the live sources is part of the task.
 */
export interface ComponentRef {
  id: string;
  /** e.g. an RPi poll endpoint, or a robot-API device id. Optional. */
  source?: string;
}

/**
 * Static registry data for one robot and its attached components.
 *
 * This is the kind of data that lives in the static "DB" (Supabase): what
 * hardware exists and where it is. It does NOT contain live status — you pull
 * that yourself from the live RPi and the robot API.
 */
export interface RobotRecord {
  id: string;
  name: string;
  propertyId: string;
  components: {
    robot: ComponentRef;
    cellularRouter: ComponentRef;
    securityPayloadRpi: ComponentRef & { sensors: SensorKind[] };
    dogHouseRpi: ComponentRef;
  };
}

/**
 * The live status of a single component, as pulled from one of the sources.
 * The shape is intentionally permissive: deciding which of these fields make
 * a component "healthy" is your call.
 */
export interface ComponentStatus {
  kind: ComponentKind;
  id: string;
  /** Could the source be reached at all? */
  reachable: boolean;
  /** Free-form payload from the source (battery, temperature, signal, ...). */
  metrics?: Record<string, unknown>;
  /** ISO timestamp of the last successful read. */
  lastSeen?: string;
}

/**
 * The robot-level answer the system exists to produce: is this robot online?
 * Produced by aggregating the component statuses — see src/lib/status.ts.
 */
export interface RobotStatus {
  robotId: string;
  online: boolean;
  /** Stretch goal: which component(s) caused the robot to be offline. */
  offlineReasons?: string[];
  components: ComponentStatus[];
}
