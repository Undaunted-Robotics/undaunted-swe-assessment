# Undaunted — SWE Assessment Starter (Part 2)

A starter Next.js app for the technical build. Scaffolding is cheap with AI, so
this isn't a typing test — we're scoring the **decisions**: how you model state,
where you put boundaries, and what you do when the environment misbehaves.
Restructure, rename, or replace anything here.

## Prerequisites

- Node.js 18.18+ (20+ recommended)
- npm

## Quick start

```bash
git clone git@github.com:Undaunted-Robotics/undaunted-swe-assessment.git
cd undaunted-swe-assessment
npm install && npm run dev
```

Open [http://localhost:3000](http://localhost:3000). It runs with **zero
configuration** — with no Supabase configured it falls back to the bundled seed
in [`src/data/sample-robots.json`](src/data/sample-robots.json). Connection
details for the Robot Status API and Supabase are provided at the start of the
segment (set them in `.env.local`, see [.env.example](.env.example)).

## What you're given

- **This dashboard template** — renders an empty robot status view, ready to wire up.
- **Supabase** — for the seed data and to persist your computed status.
- **Robot Status API** — two endpoints with different cost profiles:
  - `GET /heartbeat` — cheap, safe to call frequently. Per-component connectivity per robot.
  - `GET /telemetry` — expensive. Battery, temperature, sensor detail. **Rate-limited (429s) and occasionally slow.**
- **Static seed data** — robots and their property/location.

## Core task — the floor

Build a service that:

1. **Polls** the status endpoints for all four component types — robot, cellular
   router, security payload RPi (+ sensors), dog house RPi.
2. **Normalizes** the data into a consistent internal shape.
3. **Decides**, per robot, whether it is **online** — and persists the latest result to Supabase.
4. **Displays** the result on this dashboard.

**Done =** the dashboard shows online/offline for the two seed robots, and the
"online" rule is explicit and documented in code. Defining what "online" *means*
is part of the task — reuse the definition you designed in Part 1 (architecture).

## Where to build

| File | What's there | What to do |
| --- | --- | --- |
| [`src/lib/types.ts`](src/lib/types.ts) | Domain + raw API types | Extend / define your internal model |
| [`src/lib/api.ts`](src/lib/api.ts) | **Stubs** for `/heartbeat` + `/telemetry` | **Implement** (cadence, caching, backoff are yours) |
| [`src/lib/normalize.ts`](src/lib/normalize.ts) | **Stub** for raw → internal shape | **Implement** |
| [`src/lib/status.ts`](src/lib/status.ts) | **Stub** for the online/offline rule | **Implement (core)** |
| [`src/lib/db.ts`](src/lib/db.ts) | Seed reads + persistence stubs | Implement save/read of latest status |
| [`src/app/api/status/route.ts`](src/app/api/status/route.ts) | Starter API route | Make it return real status |
| [`src/app/page.tsx`](src/app/page.tsx) | Empty status view | Surface status here |

## Scope reliefs (so the time is real)

- Real scheduling infra is **not** required — a `setInterval` loop or an
  on-demand refresh is fine. How you'd schedule it in prod matters more than building a scheduler.
- Persisting **latest** status is core; status **history** is optional.
- No cloud deploy — runs locally.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · `@supabase/supabase-js`
