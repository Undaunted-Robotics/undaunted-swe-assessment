import { getProperties, getRobots } from "@/lib/db";

/**
 * Dashboard shell. It loads the static registry and lists each robot, but the
 * online/offline answer is intentionally left as "unknown" — building that is
 * the Part 2 task (see src/lib/sources.ts and src/lib/status.ts).
 *
 * This is just a starting point. Restructure the UI however you like.
 */
export default async function Home() {
  const [robots, properties] = await Promise.all([getRobots(), getProperties()]);
  const propertyName = (id: string) =>
    properties.find((p) => p.id === id)?.name ?? id;

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Undaunted — Fleet Monitoring
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Robot online/offline status. Status logic is not implemented yet —
          this is your starting point.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {robots.map((robot) => (
          <article
            key={robot.id}
            className="rounded-lg border border-black/10 p-4 dark:border-white/15"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-medium">{robot.name}</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {propertyName(robot.propertyId)}
                </p>
              </div>
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                status: unknown
              </span>
            </div>
            <ul className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              <li>robot · cellular router · payload RPi (+sensors) · dog house RPi</li>
            </ul>
          </article>
        ))}
      </section>

      <p className="mt-10 text-xs text-zinc-400 dark:text-zinc-500">
        Build the status pipeline in <code>src/lib/sources.ts</code> and{" "}
        <code>src/lib/status.ts</code>, then surface it here or at{" "}
        <code>/api/status</code>.
      </p>
    </main>
  );
}
