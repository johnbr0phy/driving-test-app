"use client";

import Link from "next/link";
import {
  CARD, ROW, STICKY_COL, TableScroll, TabError, TabHeader, TabLoading, fmtUpdated, useAdminFetch,
} from "@/components/admin/AdminTabParts";
import type { IndexNowRunRow, NewTestsPayload } from "@/lib/server/newTestsAdmin";
import type { BingSent } from "@/lib/newTests";

// The New tests tab on /admin, from /api/admin/new-tests
// (lib/server/newTestsAdmin.ts): the 200 most recently launched tests, each
// with what it has done since launch, and when its pages were sent to Bing
// through IndexNow (lib/indexNowSent.mjs).

const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");
const fmtUsd = (cents: number) => `$${Math.round(cents / 100).toLocaleString("en-US")}`;
const fmtDay = (day: string) => new Date(`${day}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const TH = "px-3 py-2 text-right font-medium whitespace-nowrap";
const TD = "px-3 py-2 text-right tabular-nums whitespace-nowrap";

const fmtWhen = (iso: string) =>
  new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const SOURCE_LABEL: Record<string, string> = {
  deploy: "After deploy",
  nightly: "Nightly",
  manual: "By hand",
  full: "Full resubmit",
};
/** A sender that has not run in this long has probably stopped. */
const STALE_MS = 36 * 3_600_000;

function BingCell({ b }: { b: BingSent | null }) {
  if (!b) return <span className="text-amber-600 dark:text-amber-400">Not yet</span>;
  return (
    <span title={`First sent ${fmtWhen(b.first)}, last sent ${fmtWhen(b.last)}, ${b.pages} page${b.pages === 1 ? "" : "s"}${b.landing ? "" : ", landing not sent"}`}>
      {fmtWhen(b.first).split(",")[0]}
      <span className="text-[11px] text-gray-500 dark:text-gray-400"> · {b.pages}p{b.landing ? "" : " (no landing)"}</span>
    </span>
  );
}

function SenderStatus({ label, at, now }: { label: string; at: string | null; now: number }) {
  const stale = !at || now - Date.parse(at) > STALE_MS;
  return (
    <div className={`rounded-lg border px-3 py-2 text-sm ${stale ? "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950" : "border-gray-200 dark:border-gray-800"}`}>
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
      <div className="font-medium text-gray-900 dark:text-gray-50">{at ? fmtWhen(at) : "No run recorded yet"}</div>
    </div>
  );
}

function IndexNowCard({ data }: { data: NewTestsPayload["indexNow"] }) {
  const now = Date.now();
  const runs: IndexNowRunRow[] = data.runs;
  return (
    <div className={CARD}>
      <h3 className="font-semibold text-gray-900 dark:text-gray-50">Sent to Bing</h3>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Every production deploy and a nightly job send recently changed pages to Bing through IndexNow (Bing feeds ChatGPT search).
        Sent means Bing accepted the list; it does not tell us when a page is indexed.
        {data.since ? <> Records start {fmtWhen(data.since)}.</> : <> Nothing recorded yet: the next deploy starts the record.</>}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:max-w-md">
        <SenderStatus label="Last run after a deploy" at={data.lastDeploy} now={now} />
        <SenderStatus label="Last nightly run" at={data.lastNightly} now={now} />
      </div>
      {runs.length > 0 && (
        <TableScroll className="mt-3">
          <table className="w-full text-sm">
            <thead className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
              <tr className={ROW}>
                <th className="px-3 py-2 text-left font-medium whitespace-nowrap">When</th>
                <th className="px-3 py-2 text-left font-medium whitespace-nowrap">Run</th>
                <th className={TH}>Pages</th>
                <th className={TH}>Bing</th>
                <th className="px-3 py-2 text-left font-medium">Test landings in it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {runs.map((r, i) => (
                <tr key={`${r.at}-${i}`} className={ROW}>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-500 dark:text-gray-400">{fmtWhen(r.at)}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{SOURCE_LABEL[r.source] ?? r.source}</td>
                  <td className={TD}>{fmtInt(r.count)}</td>
                  <td className={`${TD} ${r.ok ? "text-green-700 dark:text-green-300" : "text-red-600 dark:text-red-400"}`}>
                    {r.count === 0 ? "nothing to send" : r.ok ? `accepted (${r.status})` : `failed (${r.status || "no answer"})`}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600 dark:text-gray-300 min-w-[16rem]">
                    {r.tests.length ? r.tests.map((t) => t.name).join(", ") : <span className="text-gray-400">none</span>}
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
  const notSent = rows.filter((r) => !r.bing).length;
  return (
    <div className="space-y-4 sm:space-y-6">
      <TabHeader
        subtitle={<>The {rows.length} most recently launched tests, counted since each launch · updated {fmtUpdated(data.generatedAt)}</>}
        onRefresh={() => reload(true)}
        refreshing={refreshing}
        updating={updating}
      />
      {data.indexNow && <IndexNowCard data={data.indexNow} />}
      <TableScroll className={`${CARD} !p-0`}>
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
            <tr className={ROW}>
              <th className={`${STICKY_COL} px-3 py-2 text-left font-medium`}>Test</th>
              <th className={TH}>Launched</th>
              <th className={TH} title="New visitors whose first page was one of this test's pages">Traffic</th>
              <th className={TH} title="Accounts whose first visit landed on this test">Signups</th>
              <th className={TH}>Questions answered</th>
              <th className={TH}>Premium sales</th>
              <th className={TH} title="First day any of its pages was sent to Bing through IndexNow, and how many of its pages have been sent">Sent to Bing</th>
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
                <td className={TD}><BingCell b={r.bing ?? null} /></td>
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
              <td className={TD}>{rows.length - notSent} of {rows.length}</td>
            </tr>
          </tfoot>
        </table>
      </TableScroll>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Traffic and signups count new people whose first page was one of the test&apos;s pages (landing, app or topic pages).
        Questions count every answer on the test. Sales are Premium purchases made from the test, after refunds.
        Sent to Bing is the first day any of the test&apos;s pages went to Bing through IndexNow, and how many of its pages have gone
        (hover for the latest send); &quot;Not yet&quot; can also mean it was sent before records began.
      </p>
    </div>
  );
}
