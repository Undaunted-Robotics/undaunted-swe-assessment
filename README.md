# Undaunted — SWE Technical Assessment Starter

A boilerplate Next.js app so you can spend your hour on the **architecture and
logic**, not on scaffolding. Everything here is a starting point — restructure,
rename, or replace anything you like.

## Prerequisites

- Node.js 18.18+ (20+ recommended)
- npm

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). It runs with **zero
configuration** — with no database configured it falls back to the bundled
sample dataset in [`src/data/sample-robots.json`](src/data/sample-robots.json).

## The task (Part 2)

Build one end-to-end vertical slice of the monitoring system. We care far more
about *how* you structure it than how many features you finish.

Build a service that:

1. Pulls status for all four component types — **robot**, **cellular router**,
   **security payload RPi (+ sensors)**, and **dog house RPi** — drawing live
   data from the RPi/robot API and the rest from the static DB.
2. Aggregates each robot's component states into a single, robot-level answer:
   **is this robot online?**
3. Exposes that result somehow — an API endpoint, a CLI, a minimal UI, your call.

Defining what state each component must be in for a robot to count as "online"
is part of the task. Make your logic explicit.

### Data sources

- **Static "DB"** — robot registry + locations. Bundled here as sample JSON;
  optionally backed by Supabase (see below).
- **Live RPi ("Undaunted RPi")** — a live device you **poll** over HTTP (it does
  not push). Connection details are provided at the start of the segment.
- **Robot API** — two endpoints: one cheap/frequent, one resource-intensive
  (battery, temperature, etc.).

### Stretch goals (only after the core works)

- Surface the *reason* a robot is offline (which component failed).
- Handle a live source being unreachable without crashing the whole view.
- Sketch (in code or comments) where automated alerting would hook in.
- Support more than one robot / property.

You are not expected to finish these — we're interested in how you leave room
for them.

## Where to build

| File | What's there | What to do |
| --- | --- | --- |
| [`src/lib/types.ts`](src/lib/types.ts) | Domain types | Extend as needed |
| [`src/lib/db.ts`](src/lib/db.ts) | Reads the static registry (sample JSON or Supabase) | Use as-is or adapt |
| [`src/lib/sources.ts`](src/lib/sources.ts) | **Stubs** for the live RPi + robot API | **Implement** |
| [`src/lib/status.ts`](src/lib/status.ts) | **Stub** for the online/offline aggregation | **Implement (core task)** |
| [`src/app/api/status/route.ts`](src/app/api/status/route.ts) | A starter API route | Make it return real status |
| [`src/app/page.tsx`](src/app/page.tsx) | Dashboard shell listing robots | Surface status here if you want a UI |

## Optional: use Supabase instead of the sample data

The app uses Supabase automatically if these env vars are set; otherwise it
falls back to the sample JSON.

```bash
cp .env.example .env.local
# then fill in:
#   NEXT_PUBLIC_SUPABASE_URL
#   NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · `@supabase/supabase-js`
