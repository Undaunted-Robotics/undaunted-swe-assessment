import { NextResponse } from "next/server";
import { getRobots } from "@/lib/db";

/**
 * GET /api/status
 *
 * PART 2: this is one place you might expose the robot-level online/offline
 * answer (an API endpoint, a CLI, or server-rendered UI are all fair game).
 *
 * Right now it just echoes the static registry so you can confirm the data
 * layer works. Wire in the live sources (src/lib/sources.ts) and the
 * aggregation logic (src/lib/status.ts) to make it real.
 */
export async function GET() {
  const robots = await getRobots();

  return NextResponse.json({
    note: "Not implemented yet — return real robot online/offline status here.",
    robots: robots.map((r) => ({ id: r.id, name: r.name, online: null })),
  });
}
