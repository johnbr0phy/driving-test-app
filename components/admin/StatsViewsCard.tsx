"use client";

import { CARD, ROW, STICKY_COL, ShowAllButton, TableScroll, useAdminFetch, useTopN } from "@/components/admin/AdminTabParts";
import { STATS_SOURCES, STATS_SOURCE_LABELS, type StatsSource } from "@/lib/statsViews";

// Stats page traffic (lib/statsViews.ts): views a day by where people came
// from, so moving the way in (the Tiger Time chip in the site header) can be
// read against the days before it.

type Payload = {
  total: number;
  bySource: Record<string, number>;
  daily: Record<string, Record<string, number>>;
  byExam: Record<string, number>;
};

const H2 = "text-base font-semibold text-gray-900 dark:text-gray-50";
const SUB = "mt-1 text-sm text-gray-600 dark:text-gray-300";
const TH = "text-right font-medium pb-2 px-2 whitespace-nowrap";
const TD = "py-2 px-2 text-right tabular-nums whitespace-nowrap";
const fmt = (n: number) => n.toLocaleString("en-US");

function sumDays(daily: Payload["daily"], days: string[]): number {
  return days.reduce((n, d) => n + (daily[d]?.total ?? 0), 0);
}

function lastDays(n: number, offset = 0): string[] {
  const out: string[] = [];
  for (let i = offset; i < offset + n; i++) out.push(new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10));
  return out;
}

export function StatsViewsCard() {
  const { data, error, loading } = useAdminFetch<Payload>("/api/admin/stats-views");
  const days = Object.keys(data?.daily ?? {}).sort().reverse();
  const dayRows = useTopN(days);
  const exams = Object.entries(data?.byExam ?? {}).sort((a, b) => b[1] - a[1]);
  const examRows = useTopN(exams);
  if (loading) return <div className={`${CARD} mb-3 sm:mb-4 text-sm text-gray-500`}>Loading stats page traffic...</div>;
  if (error || !data) return null;
  // Only sources that have ever had a view get a column.
  const sources = STATS_SOURCES.filter((s) => (data.bySource[s] ?? 0) > 0);
  const week = sumDays(data.daily, lastDays(7));
  const prevWeek = sumDays(data.daily, lastDays(7, 7));
  return (
    <div className={`${CARD} mb-3 sm:mb-4`}>
      <h2 className={H2}>Stats page traffic</h2>
      <p className={SUB}>
        Stats page views (DMV, every exam and v2 exam), by where people came from. Counted when the page actually shows (not when a guest is sent to
        sign up). Test, internal and analytics-declined browsers and bots never count. Days are UTC.
      </p>
      {data.total === 0 ? (
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">No views counted yet.</p>
      ) : (
        <>
          <p className="mt-3 text-sm text-gray-900 dark:text-gray-50">
            <span className="font-semibold tabular-nums">{fmt(week)}</span> in the last 7 days
            {prevWeek > 0 && (
              <>
                {" "}vs <span className="tabular-nums">{fmt(prevWeek)}</span> the 7 before ({week >= prevWeek ? "+" : ""}
                {Math.round(((week - prevWeek) / prevWeek) * 100)}%)
              </>
            )}
            . <span className="tabular-nums">{fmt(data.total)}</span> since counting began.
          </p>
          <TableScroll className="mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 dark:text-gray-400">
                  <th className={`text-left font-medium pb-2 ${STICKY_COL}`}>Day</th>
                  <th className={TH}>Views</th>
                  {sources.map((s) => (
                    <th key={s} className={TH}>
                      {STATS_SOURCE_LABELS[s as StatsSource]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {dayRows.shown.map((d) => (
                  <tr key={d} className={`${ROW} text-gray-900 dark:text-gray-50`}>
                    <td className={`py-2 pr-2 ${STICKY_COL}`}>{d}</td>
                    <td className={`${TD} font-semibold`}>{fmt(data.daily[d]?.total ?? 0)}</td>
                    {sources.map((s) => (
                      <td key={s} className={TD}>
                        {fmt(data.daily[d]?.[s] ?? 0)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
          <ShowAllButton hidden={dayRows.hidden} all={dayRows.all} onToggle={dayRows.toggle} noun="more days" />
          {exams.length > 0 && (
            <details className="mt-3">
              <summary className="cursor-pointer text-sm font-semibold text-gray-900 dark:text-gray-50">Views by test (all time)</summary>
              <ul className="mt-2 space-y-1 text-sm">
                {examRows.shown.map(([exam, n]) => (
                  <li key={exam} className="flex justify-between gap-3 text-gray-700 dark:text-gray-200">
                    <span>{exam}</span>
                    <span className="tabular-nums">{fmt(n)}</span>
                  </li>
                ))}
              </ul>
              <ShowAllButton hidden={examRows.hidden} all={examRows.all} onToggle={examRows.toggle} noun="more tests" />
            </details>
          )}
        </>
      )}
    </div>
  );
}
