"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CARD, ROW, STICKY_COL, ShowAllButton, TabError, TabHeader, TabLoading, TableScroll, fmtUpdated, useAdminFetch, useTopN,
} from "@/components/admin/AdminTabParts";
import type { NewTestsPayload } from "@/lib/server/newTestsAdmin";
import type { NewTestRow } from "@/lib/newTests";

// The New tests tab on /admin, from /api/admin/new-tests
// (lib/server/newTestsAdmin.ts): is each test launched in the last 90 days
// bringing new people to Tigertest? Tiles, every new test (sortable), launch
// weeks and categories, so the next build can follow what works.

const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");
const fmtRate = (n: number) => (n >= 10 ? fmtInt(n) : n.toFixed(1));
const fmtPct = (part: number, whole: number) => (whole > 0 ? `${Math.round((part / whole) * 100)}%` : "–");
const fmtUsd = (cents: number) => `$${Math.round(cents / 100).toLocaleString("en-US")}`;
const fmtDay = (day: string) => new Date(`${day}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const H2 = "text-base font-semibold text-gray-900 dark:text-gray-50";
const SUB = "mt-1 text-sm text-gray-500 dark:text-gray-400";
const TH = "text-right font-medium pb-2 pl-4 whitespace-nowrap";
const THL = "text-left font-medium pb-2 pl-4 whitespace-nowrap";
const TD = "py-2 pl-4 text-right tabular-nums whitespace-nowrap";
const TDL = "py-2 pl-4 whitespace-nowrap";
const MUTED = "text-gray-400";

function Tile({ label, value, sub }: { label: string; value: string; sub: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-gray-900 p-4 shadow-sm">
      <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-1.5 text-2xl leading-none font-semibold text-gray-900 dark:text-gray-50 tracking-tight tabular-nums">{value}</p>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{sub}</p>
    </div>
  );
}

const SORTS = {
  newest: { label: "Newest", by: (a: NewTestRow, b: NewTestRow) => b.launched.localeCompare(a.launched) || b.visitors - a.visitors },
  perDay: { label: "Visitors a day", by: (a: NewTestRow, b: NewTestRow) => b.visitorsPerDay - a.visitorsPerDay },
  week: { label: "Visitors 7d", by: (a: NewTestRow, b: NewTestRow) => b.visitors7d - a.visitors7d },
  signups: { label: "Signups", by: (a: NewTestRow, b: NewTestRow) => b.signups - a.signups || b.visitors - a.visitors },
  revenue: { label: "Revenue", by: (a: NewTestRow, b: NewTestRow) => b.revenueUsdCents - a.revenueUsdCents || b.signups - a.signups },
} as const;
type SortKey = keyof typeof SORTS;

function TestsTable({ tests }: { tests: NewTestRow[] }) {
  const [sort, setSort] = useState<SortKey>("newest");
  const [filter, setFilter] = useState("");
  const rows = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return tests
      .filter((t) => !q || `${t.name} ${t.id} ${t.group} ${t.region}`.toLowerCase().includes(q))
      .sort(SORTS[sort].by);
  }, [tests, sort, filter]);
  const top = useTopN(rows, 25);

  return (
    <div className={CARD}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className={H2}>Every new test</h2>
          <p className={SUB}>
            New visitors are first visits that landed on the test&apos;s pages; signups are accounts whose first visit did.
            Visitors a day divides by days live, so a test from Monday and one from last month compare fairly.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by name, group, country"
            className="text-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-lg px-3 py-1.5 w-56"
          />
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-800 p-0.5">
            {(Object.keys(SORTS) as SortKey[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setSort(k)}
                className={`text-xs font-medium rounded-md px-2.5 py-1 whitespace-nowrap ${
                  sort === k ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {SORTS[k].label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <TableScroll className="mt-4">
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500 dark:text-gray-400">
            <tr>
              <th className={`${THL} pl-0 ${STICKY_COL} bg-white dark:bg-gray-900`}>Test</th>
              <th className={THL}>Launched</th>
              <th className={TH}>New visitors</th>
              <th className={TH}>7 days</th>
              <th className={TH}>A day</th>
              <th className={TH} title="Of the new visitors, how many answered a first question">Answered</th>
              <th className={TH} title="People who answered at least one of its questions (anyone, not only new visitors)">Learners</th>
              <th className={TH}>Answers 7d</th>
              <th className={TH}>Signups</th>
              <th className={TH}>Purchases</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {top.shown.map((t) => (
              <tr key={t.id} className={ROW}>
                <td className={`${TDL} pl-0 ${STICKY_COL} max-w-[15rem]`}>
                  <Link href={t.href} className="font-medium text-gray-900 dark:text-gray-50 hover:underline truncate block" title={t.name}>
                    {t.name}
                  </Link>
                  <span className="block text-[11px] text-gray-500 dark:text-gray-400 truncate" title={t.group}>
                    {t.region} · {t.group}
                  </span>
                </td>
                <td className={TDL}>
                  {fmtDay(t.launched)} <span className={MUTED}>· {t.daysLive}d</span>
                </td>
                <td className={TD}>{t.visitors ? fmtInt(t.visitors) : <span className={MUTED}>0</span>}</td>
                <td className={TD}>{t.visitors7d ? fmtInt(t.visitors7d) : <span className={MUTED}>0</span>}</td>
                <td className={TD}>{t.visitors ? fmtRate(t.visitorsPerDay) : <span className={MUTED}>0</span>}</td>
                <td className={TD}>{t.visitors ? fmtPct(t.firstAnswers, t.visitors) : <span className={MUTED}>–</span>}</td>
                <td className={TD}>
                  {fmtInt(t.learners)}
                  {t.learners7d > 0 && <span className={MUTED}> +{fmtInt(t.learners7d)}</span>}
                </td>
                <td className={TD}>{fmtInt(t.answers7d)}</td>
                <td className={TD}>
                  {t.signups ? fmtInt(t.signups) : <span className={MUTED}>0</span>}
                  {t.signups7d > 0 && <span className={MUTED}> +{fmtInt(t.signups7d)}</span>}
                </td>
                <td className={TD}>
                  {t.purchases ? (
                    <>
                      {fmtInt(t.purchases)} <span className={MUTED}>· {fmtUsd(t.revenueUsdCents)}</span>
                    </>
                  ) : (
                    <span className={MUTED}>0</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
      {rows.length === 0 && <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">No tests match.</p>}
      <ShowAllButton hidden={top.hidden} all={top.all} onToggle={top.toggle} noun="more tests" />
      <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
        +N is the last 7 days. Learners counts anyone who answered one of its questions, including people already on Tigertest.
        Purchases are Premium bought on this test since it launched.
      </p>
    </div>
  );
}

function CohortsCard({ data }: { data: NewTestsPayload }) {
  const top = useTopN(data.cohorts, 8);
  return (
    <div className={CARD}>
      <h2 className={H2}>By launch week</h2>
      <p className={SUB}>Are the tests you build now pulling more people than the ones from earlier weeks? Compare visitors a test a day.</p>
      <TableScroll className="mt-4">
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500 dark:text-gray-400">
            <tr>
              <th className={`${THL} pl-0 ${STICKY_COL} bg-white dark:bg-gray-900`}>Week of</th>
              <th className={TH}>Tests</th>
              <th className={TH}>New visitors</th>
              <th className={TH}>A test a day</th>
              <th className={TH}>Signups</th>
              <th className={TH}>Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {top.shown.map((c) => (
              <tr key={c.week} className={ROW}>
                <td className={`${TDL} pl-0 ${STICKY_COL}`}>{fmtDay(c.week)}</td>
                <td className={TD}>{fmtInt(c.tests)}</td>
                <td className={TD}>{fmtInt(c.visitors)}</td>
                <td className={TD}>{fmtRate(c.visitorsPerTestDay)}</td>
                <td className={TD}>{fmtInt(c.signups)}</td>
                <td className={TD}>{c.purchases ? `${fmtInt(c.purchases)} · ${fmtUsd(c.revenueUsdCents)}` : <span className={MUTED}>0</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
      <ShowAllButton hidden={top.hidden} all={top.all} onToggle={top.toggle} noun="more weeks" />
    </div>
  );
}

function GroupsCard({ data }: { data: NewTestsPayload }) {
  const top = useTopN(data.groups);
  return (
    <div className={CARD}>
      <h2 className={H2}>What kind of test works</h2>
      <p className={SUB}>New tests by catalog group, best first by visitors a test a day. Build more of what is at the top.</p>
      <TableScroll className="mt-4">
        <table className="w-full text-sm">
          <thead className="text-xs text-gray-500 dark:text-gray-400">
            <tr>
              <th className={`${THL} pl-0 ${STICKY_COL} bg-white dark:bg-gray-900`}>Group</th>
              <th className={TH}>Tests</th>
              <th className={TH}>A test a day</th>
              <th className={TH}>Visitors 7d</th>
              <th className={TH}>Signups</th>
              <th className={TH}>Revenue</th>
              <th className={THL}>Best test</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {top.shown.map((g) => (
              <tr key={g.group} className={ROW}>
                <td className={`${TDL} pl-0 ${STICKY_COL} max-w-[16rem] truncate`} title={g.group}>{g.group}</td>
                <td className={TD}>{fmtInt(g.tests)}</td>
                <td className={TD}>{fmtRate(g.visitorsPerTestDay)}</td>
                <td className={TD}>{fmtInt(g.visitors7d)}</td>
                <td className={TD}>{fmtInt(g.signups)}</td>
                <td className={TD}>{g.revenueUsdCents ? fmtUsd(g.revenueUsdCents) : <span className={MUTED}>0</span>}</td>
                <td className={`${TDL} max-w-[14rem] truncate`} title={g.best?.name}>{g.best?.name ?? <span className={MUTED}>none yet</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
      <ShowAllButton hidden={top.hidden} all={top.all} onToggle={top.toggle} noun="more groups" />
    </div>
  );
}

export function NewTestsTab() {
  const { data, error, loading, refreshing, updating, reload } = useAdminFetch<NewTestsPayload>("/api/admin/new-tests");
  if (loading) return <TabLoading />;
  if (error || !data) return <TabError message={error || "Failed to load"} />;
  const t = data.tiles;
  return (
    <div className="space-y-4 sm:space-y-6">
      <TabHeader
        subtitle={<>{fmtInt(data.tests.length)} tests launched in the last {data.windowDays} days · updated {fmtUpdated(data.generatedAt)}</>}
        onRefresh={() => reload(true)}
        refreshing={refreshing}
        updating={updating}
      />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Tile label="Launched" value={`${fmtInt(t.launched7d)} / ${fmtInt(t.launched30d)}`} sub="last 7 / 30 days" />
        <Tile
          label="New visitors, 7 days"
          value={fmtInt(t.visitors7d)}
          sub={<>{fmtPct(t.visitors7d, t.allVisitors7d)} of all {fmtInt(t.allVisitors7d)} first visits</>}
        />
        <Tile
          label="Signups, 7 days"
          value={fmtInt(t.signups7d)}
          sub={<>{fmtPct(t.signups7d, t.allSignups7d)} of all {fmtInt(t.allSignups7d)} signups</>}
        />
        <Tile label="Revenue" value={fmtUsd(t.revenueUsdCents)} sub={<>{fmtInt(t.purchases)} purchases since launch</>} />
        <Tile label="No visitors yet" value={fmtInt(t.noVisitorsAfterWeek)} sub="live a week or more, no first visit" />
      </div>
      <TestsTable tests={data.tests} />
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <CohortsCard data={data} />
        <GroupsCard data={data} />
      </div>
    </div>
  );
}
