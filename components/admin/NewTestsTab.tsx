"use client";

import Link from "next/link";
import {
  CARD, ROW, STICKY_COL, TabError, TabHeader, TabLoading, fmtUpdated, useAdminFetch,
} from "@/components/admin/AdminTabParts";
import type { NewTestsPayload } from "@/lib/server/newTestsAdmin";

// The New tests tab on /admin, from /api/admin/new-tests
// (lib/server/newTestsAdmin.ts): the 100 most recently launched tests, each
// with what it has done since launch.

const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");
const fmtUsd = (cents: number) => `$${Math.round(cents / 100).toLocaleString("en-US")}`;
const fmtDay = (day: string) => new Date(`${day}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const TH = "px-3 py-2 text-right font-medium whitespace-nowrap";
const TD = "px-3 py-2 text-right tabular-nums whitespace-nowrap";

function Num({ n }: { n: number }) {
  return n ? <>{fmtInt(n)}</> : <span className="text-gray-300 dark:text-gray-600">0</span>;
}

export function NewTestsTab() {
  const { data, error, loading, refreshing, updating, reload } = useAdminFetch<NewTestsPayload>("/api/admin/new-tests");
  if (loading) return <TabLoading />;
  if (error || !data) return <TabError message={error || "Failed to load"} />;
  const rows = data.tests;
  const sum = (f: (r: (typeof rows)[number]) => number) => rows.reduce((s, r) => s + f(r), 0);
  const total = {
    visitors: sum((r) => r.visitors),
    signups: sum((r) => r.signups),
    answered: sum((r) => r.answered),
    sales: sum((r) => r.sales),
    revenue: sum((r) => r.revenueUsdCents),
  };
  return (
    <div className="space-y-4 sm:space-y-6">
      <TabHeader
        subtitle={<>The {rows.length} most recently launched tests, counted since each launch · updated {fmtUpdated(data.generatedAt)}</>}
        onRefresh={() => reload(true)}
        refreshing={refreshing}
        updating={updating}
      />
      <div className={`${CARD} !p-0 overflow-x-auto`}>
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
            <tr className={ROW}>
              <th className={`${STICKY_COL} px-3 py-2 text-left font-medium`}>Test</th>
              <th className={TH}>Launched</th>
              <th className={TH} title="New visitors whose first page was one of this test's pages">Traffic</th>
              <th className={TH} title="Accounts whose first visit landed on this test">Signups</th>
              <th className={TH}>Questions answered</th>
              <th className={TH}>Premium sales</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {rows.map((r) => (
              <tr key={r.id} className={ROW}>
                <td className={`${STICKY_COL} px-3 py-2 max-w-[14rem] sm:max-w-xs`}>
                  <Link href={r.href} className="block truncate font-medium text-gray-900 dark:text-gray-50 hover:underline" title={r.name}>
                    {r.name}
                  </Link>
                </td>
                <td className={`${TD} text-gray-500 dark:text-gray-400`}>
                  {fmtDay(r.launched)} <span className="text-[11px]">({r.daysLive}d)</span>
                </td>
                <td className={TD}><Num n={r.visitors} /></td>
                <td className={TD}><Num n={r.signups} /></td>
                <td className={TD}><Num n={r.answered} /></td>
                <td className={TD}>{r.sales ? `${r.sales} · ${fmtUsd(r.revenueUsdCents)}` : <Num n={0} />}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t border-gray-200 dark:border-gray-800 font-semibold text-gray-900 dark:text-gray-50">
            <tr className={ROW}>
              <td className={`${STICKY_COL} px-3 py-2`}>Total</td>
              <td className={TD} />
              <td className={TD}>{fmtInt(total.visitors)}</td>
              <td className={TD}>{fmtInt(total.signups)}</td>
              <td className={TD}>{fmtInt(total.answered)}</td>
              <td className={TD}>{total.sales} · {fmtUsd(total.revenue)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Traffic and signups count new people whose first page was one of the test&apos;s pages (landing, app or topic pages).
        Questions count every answer on the test. Sales are Premium purchases made from the test, after refunds.
      </p>
    </div>
  );
}
