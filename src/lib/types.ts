/**
 * Domain + API types for the Undaunted monitoring system.
 *
 * The raw API shapes describe what the Robot Status API (Render) is expected
 * to return; confirm them against the live endpoints. Everything else is the
 * internal model you design. Deciding what "online" means — and how raw data
 * maps to your internal shape — is the Part 2 task.
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
 * Static registry data (seeded into Supabase): what hardware exists and where.
 * It does NOT contain live status — you pull that from the Robot Status API.
 */
export interface RobotRecord {
  id: string;
  name: string;
  propertyId: string;
  components: {
    robot: { id: string };
    cellularRouter: { id: string };
    securityPayloadRpi: { id: string; sensors: SensorKind[] };
    dogHouseRpi: { id: string };
  };
}

/* ------------------------------------------------------------------ *
 * Raw API shapes — Robot Status API (Render). PROVISIONAL: confirm
 * against the live endpoints. A curveball robot may violate these
 * (extra/missing/differently-typed fields) — that's intentional, and
 * your normalization layer should absorb it rather than assume clean data.
 * ------------------------------------------------------------------ */

/** GET /heartbeat — cheap, safe to call frequently. Per-component connectivity. */
export interface HeartbeatResponse {
  robots: HeartbeatRobot[];
}

export interface HeartbeatRobot {
  robotId: string;
  /** True while the robot is out on patrol — the dog house RPi disconnects by
   *  design in this state, so its disconnect is intentional, not a fault. */
  onPatrol?: boolean;
  /** Connectivity per component, e.g. { robot: true, dogHouseRpi: false }. */
  components: Partial<Record<ComponentKind, boolean>>;
}

/** GET /telemetry — expensive, rate-limited (429s), occasionally slow. */
export interface TelemetryResponse {
  robots: TelemetryRobot[];
}

export interface TelemetryRobot {
  robotId: string;
  battery?: number;
  temperatureC?: number;
  sensors?: Partial<Record<SensorKind, string>>;
  /** Curveball robots may carry extra fields (e.g. location). Don't assume. */
  [key: string]: unknown;
}

/* ------------------------------------------------------------------ *
 * Internal model — you define how raw maps to this.
 * ------------------------------------------------------------------ */

/** Normalized live status of a single component. */
export interface ComponentStatus {
  kind: ComponentKind;
  id: string;
  /** Could we reach/confirm this component at all? */
  reachable: boolean;
  /** Free-form normalized metrics (battery, temperature, sensor states, ...). */
  metrics?: Record<string, unknown>;
  /** ISO timestamp of the last successful read. */
  lastSeen?: string;
}

/** The robot-level answer the system exists to produce. Persisted to Supabase. */
export interface RobotStatus {
  robotId: string;
  online: boolean;
  /** Which component(s) caused the robot to be offline (add-on). */
  offlineReasons?: string[];
  components: ComponentStatus[];
  updatedAt: string;
}
