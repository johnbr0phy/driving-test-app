"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useAdminFetch } from "@/components/admin/AdminTabParts";
import type { WalRollup } from "@/lib/server/weeklyActiveLearners";

// Weekly Active Learners on the /admin Growth tab. The card reads
// /api/admin/wal, which reads one rollup doc. It does not list learners.

type WalResponse = ({ ready: true } & WalRollup) | { ready: false; guestTrackingSince: string };

const fmt = (n: number) => n.toLocaleString("en-US");

const fmtDay = (key: string) =>
  new Date(`${key}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

const SIGNED_IN = "#2a78d6";
const GUEST = "#eb6834";

function Change({ change, previous }: { change: number; previous: number }) {
  const up = change > 0;
  const flat = change === 0;
  const color = flat ? "#898781" : up ? "#006300" : "#d03b3b";
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  const pct = previous > 0 ? ` (${up ? "+" : ""}${Math.round((change / previous) * 100)}%)` : "";
  return (
    <p className="text-xs flex items-center gap-0.5" style={{ color }}>
      {!flat && <Icon className="h-3.5 w-3.5" />}
      <span>
        {up ? "+" : ""}
        {fmt(change)}
        {pct}
        <span className="text-gray-500 dark:text-gray-400 ml-1">vs the previous 7 days</span>
      </span>
    </p>
  );
}

export function WeeklyActiveLearnersCard({ rollup }: { rollup: WalRollup }) {
  const max = Math.max(...rollup.weeks.map((w) => w.total), 1);
  const history = rollup.weeks.some((w) => w.guestsIncomplete);
  const since = fmtDay(rollup.guestTrackingSince);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-5 mb-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">Weekly active learners</h2>
          <p className="mt-2 text-[32px] leading-none font-semibold text-gray-900 dark:text-gray-50 tracking-tight tabular-nums">
            {fmt(rollup.current.total)}
          </p>
          <div className="mt-2">
            <Change change={rollup.change} previous={rollup.previous.total} />
          </div>
          <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-300 tabular-nums">
            <span className="inline-block w-2 h-2 rounded-sm mr-1 align-middle" style={{ backgroundColor: SIGNED_IN }} />
            {fmt(rollup.current.signedIn)} signed in
            <span className="mx-2 text-gray-300 dark:text-gray-600">·</span>
            <span className="inline-block w-2 h-2 rounded-sm mr-1 align-middle" style={{ backgroundColor: GUEST }} />
            {fmt(rollup.current.guests)} guests
          </p>
        </div>
        <p className="text-[11px] text-gray-500 dark:text-gray-400">
          Updated {new Date(rollup.updatedAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
        </p>
      </div>

      <div className="mt-5" role="img" aria-label="Weekly active learners for the last 8 weeks">
        <div className="grid grid-cols-8 gap-2 items-end">
          {rollup.weeks.map((w) => (
            <div key={w.endDate} className="flex flex-col items-center gap-1 min-w-0" title={`${fmt(w.signedIn)} signed in, ${fmt(w.guests)} guests`}>
              <div className="h-16 w-full flex items-end">
                <div
                  className="w-full flex flex-col-reverse overflow-hidden rounded-t-sm"
                  style={{ height: w.total > 0 ? `${Math.max((w.total / max) * 100, 8)}%` : "0%" }}
                >
                  {w.signedIn > 0 && <div className="w-full" style={{ flexGrow: w.signedIn, backgroundColor: SIGNED_IN }} />}
                  {w.guests > 0 && <div className="w-full" style={{ flexGrow: w.guests, backgroundColor: GUEST }} />}
                </div>
              </div>
              <p className="text-[11px] font-medium tabular-nums text-gray-900 dark:text-gray-50">{fmt(w.total)}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center leading-tight">{fmtDay(w.endDate)}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
        Each bar is a distinct count for the 7 days ending on that date. The newest bar is the current week.
        {history && (
          <>
            {" "}
            History before {since} has no guest data. Signed-in counts before that date use saved progress dates.
          </>
        )}{" "}
        From {since}, a learner counts on a day an answer is accepted. A guest who creates an account counts once.
      </p>
    </div>
  );
}

export function WeeklyActiveLearners() {
  const { data, error, loading } = useAdminFetch<WalResponse>("/api/admin/wal");

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">Weekly active learners</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">Weekly active learners</h2>
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }
  if (!data?.ready) {
    const since = data?.guestTrackingSince ? fmtDay(data.guestTrackingSince) : null;
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">Weekly active learners</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          The daily job has not written the rollup yet.
          {since ? ` History before ${since} has no guest data.` : ""}
        </p>
      </div>
    );
  }
  return <WeeklyActiveLearnersCard rollup={data} />;
}
