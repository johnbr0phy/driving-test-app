"use client";

import { CARD, ROW, STICKY_COL, TableScroll } from "@/components/admin/AdminTabParts";
import type { OpportunitiesPayload } from "@/lib/server/opportunities";

// The v1 lock share test (lib/lockTest.ts): half of browsers see the last 25%
// of every v1 exam dashboard locked, half the last 50%. Shown on the A/B
// tests tab from the Today tab's payload.

type LockTest = NonNullable<OpportunitiesPayload["lockTest"]>;

const fmtInt = (n: number) => n.toLocaleString("en-US");
const fmtDollars = (cents: number) => `$${Math.round(cents / 100).toLocaleString("en-US")}`;
const fmtDay = (key: string) =>
  new Date(key + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const dash = <span className="text-gray-400">·</span>;

function Th({ children, right, title, sticky }: { children: React.ReactNode; right?: boolean; title?: string; sticky?: boolean }) {
  return (
    <th title={title} className={`font-medium pb-2 px-2 whitespace-nowrap ${right ? "text-right" : "text-left"} ${sticky ? STICKY_COL : ""}`}>
      {children}
    </th>
  );
}

export function LockTestCard({ t }: { t: LockTest }) {
  return (
    <section className={`text-gray-900 dark:text-gray-50 ${CARD} mb-3 sm:mb-4`}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50">Lock share test, v1 exams</h2>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          50/50 by browser{t.since ? `, since ${fmtDay(t.since.slice(0, 10))}` : ""}
        </div>
      </div>
      <TableScroll className="-mx-2">
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500 dark:text-gray-400">
            <tr className={ROW}>
              <Th sticky>Locks</Th>
              <Th right title="Browsers, not Premium, that opened a v1 exam page">Browsers</Th>
              <Th right title="v1 exam page loads, one per exam per load">Views</Th>
              <Th right title="Purchases by browsers in this arm, from any paywall">Purchases</Th>
              <Th right title="Purchases per 100 browsers">Buyers per 100</Th>
              <Th right>Revenue</Th>
              <Th right title="Revenue per 100 browsers">Revenue per 100</Th>
            </tr>
          </thead>
          <tbody>
            {t.arms.map((a) => (
              <tr key={a.id} className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
                <td className={`py-2 px-2 font-medium text-gray-900 dark:text-gray-50 ${STICKY_COL}`}>{a.label}</td>
                <td className="py-2 px-2 text-right tabular-nums">{fmtInt(a.browsers)}</td>
                <td className="py-2 px-2 text-right tabular-nums">{fmtInt(a.views)}</td>
                <td className="py-2 px-2 text-right tabular-nums">{fmtInt(a.purchases)}</td>
                <td className="py-2 px-2 text-right tabular-nums">
                  {a.browsers > 0 ? ((a.purchases / a.browsers) * 100).toFixed(2) : dash}
                </td>
                <td className="py-2 px-2 text-right tabular-nums">{a.revenueCents > 0 ? fmtDollars(a.revenueCents) : dash}</td>
                <td className="py-2 px-2 text-right tabular-nums">
                  {a.browsers > 0 && a.revenueCents > 0 ? fmtDollars((a.revenueCents / a.browsers) * 100) : dash}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
      <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
        {t.pValue === null
          ? "No purchases from the test yet."
          : t.pValue < 0.05
            ? `The difference is unlikely to be chance (p = ${t.pValue.toFixed(3)}).`
            : `Too close to call so far (p = ${t.pValue.toFixed(2)}); keep it running.`}{" "}
        Each browser keeps its side. Steps someone already started stay open in both. The DMV and v2 exams are not in the test.
        Preview a side with ?locks=25 or ?locks=50.
      </p>
    </section>
  );
}
