import { getLatestStatuses, getProperties, getRobots } from "@/lib/db";

/**
 * Empty robot status view — ready to wire up.
 *
 * It loads the seed robots and any persisted statuses, but the online/offline
 * answer is left blank: building the poll → normalize → decide → persist
 * pipeline (and surfacing it here) is the Part 2 task. Restructure freely.
 */
export default async function Home() {
  const [robots, properties, statuses] = await Promise.all([
    getRobots(),
    getProperties(),
    getLatestStatuses(),
  ]);

  const propertyName = (id: string) =>
    properties.find((p) => p.id === id)?.name ?? id;
  const statusById = new Map(statuses.map((s) => [s.robotId, s]));

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Undaunted — Fleet Monitoring
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Robot online/offline status. The status pipeline is not implemented
          yet — this is your starting point.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {robots.map((robot) => {
          const status = statusById.get(robot.id);
          const label =
            status?.online === undefined
              ? "status: unknown"
              : status.online
                ? "online"
                : "offline";
          return (
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
                  {label}
                </span>
              </div>
              <ul className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                <li>
                  robot · cellular router · payload RPi (+sensors) · dog house RPi
                </li>
              </ul>
            </article>
          );
        })}
      </section>

      <p className="mt-10 text-xs text-zinc-400 dark:text-zinc-500">
        Build the pipeline across <code>src/lib/api.ts</code>,{" "}
        <code>src/lib/normalize.ts</code>, and <code>src/lib/status.ts</code>,
        persist via <code>src/lib/db.ts</code>, then surface it here or at{" "}
        <code>/api/status</code>.
      </p>
    </main>
  );
}
