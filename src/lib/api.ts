import type { HeartbeatResponse, TelemetryResponse } from "@/lib/types";

/**
 * ============================================================================
 * PART 2 — LIVE SOURCES: the Robot Status API (build this)
 * ============================================================================
 *
 * Two endpoints with deliberately different cost profiles:
 *
 *   GET /heartbeat  — cheap, safe to call frequently. Per-component
 *                     connectivity for each robot.
 *   GET /telemetry  — expensive/resource-intensive. Battery, temperature,
 *                     sensor detail. RATE-LIMITED (429s) and occasionally slow.
 *
 * How often you hit each, whether you cache /telemetry, whether you only fetch
 * it when /heartbeat signals a change, and how you back off under 429 are all
 * YOUR decisions — that's a primary signal, so they're left unimplemented.
 *
 * Base URL comes from ROBOT_API_BASE_URL (see .env.example).
 */

const BASE_URL = process.env.ROBOT_API_BASE_URL ?? "";

export async function fetchHeartbeat(): Promise<HeartbeatResponse> {
  void BASE_URL;
  throw new Error("Not implemented: GET /heartbeat");
}

export async function fetchTelemetry(): Promise<TelemetryResponse> {
  // Mind the 429s and timeouts here.
  throw new Error("Not implemented: GET /telemetry");
}
