import { NextResponse } from "next/server";
import { getLatestStatuses, getRobots } from "@/lib/db";

/**
 * GET /api/status
 *
 * One place to expose the robot-level online/offline answer. Right now it
 * returns the seed robots with `online: null`. Wire in the pipeline —
 * poll (src/lib/api.ts) → normalize (src/lib/normalize.ts) → decide
 * (src/lib/status.ts) → persist (src/lib/db.ts) — to make it real.
 */
export async function GET() {
  const [robots, latest] = await Promise.all([getRobots(), getLatestStatuses()]);
  const byId = new Map(latest.map((s) => [s.robotId, s]));

  return NextResponse.json({
    note: "Not implemented yet — return real robot online/offline status here.",
    robots: robots.map((r) => ({
      id: r.id,
      name: r.name,
      online: byId.get(r.id)?.online ?? null,
    })),
  });
}
