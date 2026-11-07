"use client";

import { useState } from "react";
import { CARD, ROW, STICKY_COL, TableScroll, useAdminFetch } from "@/components/admin/AdminTabParts";
import type { LayoutRetentionPayload, RetentionRow } from "@/lib/server/layoutRetention";

// "Retention by layout" card on the /admin Growth tab (/api/admin/layout-retention,
// lib/server/layoutRetention.ts, tracked by lib/layoutRetention.ts): every
// browser, guests included, by the dashboard layout it first saw. Answers two
// questions: which layout brings people back, and do people who take a
// practice test on day one come back more?

const DAYS = [1, 7, 14, 30];
const MIN = 30; // below this many people a rate is shown grey
const LABEL = { I: "Interleaved (Set 1, Test 1…)", S: "Sets first, tests at the end" } as const;

const fmt = (n: number) => n.toLocaleString("en-US");
function Rate({ n, d }: { n: number; d: number }) {
  if (!d) return <span className="text-gray-400">—</span>;
  const thin = d < MIN;
  return (
    <span className={thin ? "text-gray-400" : "font-semibold text-gray-900 dark:text-gray-50"} title={`${fmt(n)} of ${fmt(d)}`}>
      {Math.round((100 * n) / d)}%<span className="ml-1 text-[10px] font-normal text-gray-400">{fmt(d)}</span>
    </span>
  );
}

function Head({ first, extra }: { first: string; extra?: string }) {
  return (
    <thead>
      <tr className="text-xs text-gray-500 dark:text-gray-400">
        <th className={`text-left font-medium py-1 pr-3 ${STICKY_COL}`}>{first}</th>
        {extra && <th className="text-right font-medium py-1 pl-3">{extra}</th>}
        {DAYS.map((d) => (
          <th key={d} className="text-right font-medium py-1 pl-3">
            Back after {d}d
          </th>
        ))}
      </tr>
    </thead>
  );
}

export function LayoutRetention() {
  const { data, error, loading } = useAdminFetch<LayoutRetentionPayload>("/api/admin/layout-retention");
  const [showExams, setShowExams] = useState(false);
  if (loading) return <div className={`${CARD} mb-6 text-sm text-gray-500 dark:text-gray-400`}>Loading retention by layout…</div>;
  if (error || !data) return <div className={`${CARD} mb-6 text-sm text-red-600 dark:text-red-400`}>Retention by layout: {error ?? "no data"}</div>;

  const L = data.layouts;
  const row = (r: RetentionRow | undefined, part: "all" | "t" | "n") =>
    !r ? { n: 0, d: 0 } : part === "all" ? { n: r.returned, d: r.starts } : part === "t" ? { n: r.tReturned, d: r.tStarts } : { n: r.nReturned, d: r.nStarts };

  return (
    <div className={`${CARD} mb-6`}>
      <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-50">Retention by layout</h3>
      <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
        Every browser, guests included, by the dashboard layout it first saw (v1 exams), since {data.since}. &ldquo;Back after 7d&rdquo; = opened that exam again 7 or more days after starting;
        each column only counts people who started long enough ago. Small grey numbers are the people counted; grey rates have under {MIN}.
      </p>

      <h4 className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-50">Which layout brings people back?</h4>
      <TableScroll>
        <table className="w-full text-sm">
          <Head first="Layout" extra="Test on day 1" />
          <tbody>
            {(["I", "S"] as const).map((k) => (
              <tr key={k} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                <td className={`py-1.5 pr-3 ${STICKY_COL} text-gray-900 dark:text-gray-50`}>{LABEL[k]}</td>
                <td className="py-1.5 pl-3 text-right tabular-nums">
                  <Rate n={L[k].test0} d={L[k].starts} />
                </td>
                {DAYS.map((d) => {
                  const r = row(L[k].returns[`d${d}`], "all");
                  return (
                    <td key={d} className="py-1.5 pl-3 text-right tabular-nums">
                      <Rate n={r.n} d={r.d} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>

      <h4 className="mt-5 mb-1 text-sm font-medium text-gray-900 dark:text-gray-50">Do people who take a test on day 1 come back more?</h4>
      <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
        People keen enough to test early may simply be keener, so a gap here is a hint, not proof. Compare the gap between the two layouts: if early tests matter, interleaved should both get more people testing on day 1 and keep them.
      </p>
      <TableScroll>
        <table className="w-full text-sm">
          <Head first="Group" />
          <tbody>
            {(["I", "S"] as const).flatMap((k) =>
              (["t", "n"] as const).map((part) => (
                <tr key={k + part} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                  <td className={`py-1.5 pr-3 ${STICKY_COL}`}>
                    <div className="text-gray-900 dark:text-gray-50">{part === "t" ? "Took a test on day 1" : "No test on day 1"}</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">{LABEL[k]}</div>
                  </td>
                  {DAYS.map((d) => {
                    const r = row(L[k].returns[`d${d}`], part);
                    return (
                      <td key={d} className="py-1.5 pl-3 text-right tabular-nums">
                        <Rate n={r.n} d={r.d} />
                      </td>
                    );
                  })}
                </tr>
              )),
            )}
          </tbody>
        </table>
      </TableScroll>

      <button onClick={() => setShowExams(!showExams)} className="mt-4 text-xs font-medium text-gray-600 dark:text-gray-300 underline">
        {showExams ? "Hide" : "Show"} exams with 10+ starts ({data.exams.length})
      </button>
      {showExams && (
        <TableScroll className="mt-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 dark:text-gray-400">
                <th className={`text-left font-medium py-1 pr-3 ${STICKY_COL}`}>Exam</th>
                <th className="text-right font-medium py-1 pl-3">Started</th>
                <th className="text-right font-medium py-1 pl-3">Test on day 1</th>
              </tr>
            </thead>
            <tbody>
              {data.exams.map((e) => (
                <tr key={e.id} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                  <td className={`py-1.5 pr-3 ${STICKY_COL}`}>
                    <div className="text-gray-900 dark:text-gray-50">{e.name}</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">{e.layout === "I" ? "interleaved" : "sets first"}</div>
                  </td>
                  <td className="py-1.5 pl-3 text-right tabular-nums">{fmt(e.starts)}</td>
                  <td className="py-1.5 pl-3 text-right tabular-nums">
                    <Rate n={e.test0} d={e.starts} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
      )}
    </div>
  );
}
