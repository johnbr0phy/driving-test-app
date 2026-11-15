"use client";

import { useMemo, useState } from "react";
import { ArrowDown, Search } from "lucide-react";
import {
  CARD,
  ROW,
  STICKY_COL,
  ShowAllButton,
  TabError,
  TabHeader,
  TabLoading,
  TableScroll,
  fmtUpdated,
  useAdminFetch,
  useTopN,
} from "@/components/admin/AdminTabParts";
import type { AdminTestRow } from "@/lib/adminTests";

// The Tests tab on /admin: every test in the catalog in one table, with its
// practice, learners, paywall views, purchases and revenue (lib/adminTests.ts,
// /api/admin/tests). Sort by any number, filter by country or search.

type Payload = { generatedAt: string; tests: AdminTestRow[] };

type SortKey = "answers7d" | "answers30d" | "answersAll" | "learners" | "paywallHits30d" | "purchasesAll" | "revenueAllCents" | "questions";

const COLUMNS: { key: SortKey; label: string; title?: string }[] = [
  { key: "questions", label: "Questions" },
  { key: "answers7d", label: "Answers 7d", title: "Questions answered in the last 7 days, against the 7 before" },
  { key: "answers30d", label: "Answers 30d" },
  { key: "answersAll", label: "All time" },
  { key: "learners", label: "Learners", title: "Distinct people with at least one answer" },
  { key: "paywallHits30d", label: "Paywalls 30d" },
  { key: "purchasesAll", label: "Purchases", title: "All time; last 30 days in brackets" },
  { key: "revenueAllCents", label: "Revenue", title: "All time, US dollars after refunds; last 30 days in brackets" },
];

const TH = "text-right font-medium pb-2 px-2 whitespace-nowrap";
const TD = "py-2 px-2 text-right tabular-nums whitespace-nowrap";
const n = (v: number) => v.toLocaleString("en-US");
const usd = (cents: number) => `$${Math.round(cents / 100).toLocaleString("en-US")}`;

function Change({ cur, prev }: { cur: number; prev: number }) {
  if (!prev) return cur ? <span className="ml-1 text-xs text-green-700 dark:text-green-300">new</span> : null;
  const pct = Math.round(((cur - prev) / prev) * 100);
  if (pct === 0) return null;
  const cls = pct > 0 ? "text-green-700 dark:text-green-300" : "text-red-600 dark:text-red-400";
  return <span className={`ml-1 text-xs ${cls}`}>{pct > 0 ? "+" : ""}{pct}%</span>;
}

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className={CARD}>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-50 tabular-nums">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{sub}</p>}
    </div>
  );
}

export function TestsTab() {
  const { data, error, loading, refreshing, updating, reload } = useAdminFetch<Payload>("/api/admin/tests");
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [sort, setSort] = useState<SortKey>("answers30d");

  const tests = useMemo(() => data?.tests ?? [], [data]);
  const regions = useMemo(() => [...new Set(tests.map((t) => t.region))].sort(), [tests]);
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tests
      .filter((t) => region === "all" || t.region === region)
      .filter((t) => !q || `${t.name} ${t.id} ${t.group}`.toLowerCase().includes(q))
      .sort((a, b) => b[sort] - a[sort] || b.answersAll - a.answersAll || a.name.localeCompare(b.name));
  }, [tests, query, region, sort]);
  const top = useTopN(rows);

  if (loading) return <TabLoading />;
  if (error || !data) return <TabError message={error || "Failed to load"} />;

  const active30 = tests.filter((t) => t.answers30d > 0).length;
  const active7 = tests.filter((t) => t.answers7d > 0).length;
  const paying = tests.filter((t) => t.purchasesAll > 0).length;
  const totals = rows.reduce(
    (s, t) => ({
      answers7d: s.answers7d + t.answers7d,
      answers30d: s.answers30d + t.answers30d,
      answersAll: s.answersAll + t.answersAll,
      purchasesAll: s.purchasesAll + t.purchasesAll,
      revenueAllCents: s.revenueAllCents + t.revenueAllCents,
    }),
    { answers7d: 0, answers30d: 0, answersAll: 0, purchasesAll: 0, revenueAllCents: 0 },
  );

  return (
    <div>
      <TabHeader
        subtitle={`Every test in the catalog. Updated ${fmtUpdated(data.generatedAt)}.`}
        onRefresh={() => reload(true)}
        refreshing={refreshing}
        updating={updating}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
        <Tile label="Tests live" value={n(tests.length)} sub={`${n(tests.filter((t) => t.premium).length)} with Premium steps`} />
        <Tile label="Practiced in 30 days" value={n(active30)} sub={`${n(active7)} in the last 7`} />
        <Tile label="No practice in 30 days" value={n(tests.length - active30)} />
        <Tile label="Have ever sold" value={n(paying)} sub={`${n(tests.reduce((s, t) => s + t.purchasesAll, 0))} purchases in all`} />
      </div>

      <div className={CARD}>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <label className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tests"
              className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 pl-8 pr-3 py-1.5 text-sm text-gray-900 dark:text-gray-50"
            />
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-2 py-1.5 text-sm text-gray-900 dark:text-gray-50"
            aria-label="Country"
          >
            <option value="all">All countries</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r === "GLOBAL" ? "Worldwide" : r}</option>
            ))}
          </select>
          <span className="text-xs text-gray-500 dark:text-gray-400">{n(rows.length)} tests</span>
        </div>

        <TableScroll>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 dark:text-gray-400">
                <th className={`text-left font-medium pb-2 pr-2 ${STICKY_COL}`}>Test</th>
                <th className="text-left font-medium pb-2 px-2 whitespace-nowrap">Price</th>
                {COLUMNS.map((c) => (
                  <th key={c.key} className={TH} title={c.title}>
                    <button
                      type="button"
                      onClick={() => setSort(c.key)}
                      className={`inline-flex items-center gap-0.5 hover:text-gray-900 dark:hover:text-gray-50 ${sort === c.key ? "text-gray-900 dark:text-gray-50" : ""}`}
                    >
                      {c.label}
                      {sort === c.key && <ArrowDown className="h-3 w-3" aria-hidden />}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {top.shown.map((t) => (
                <tr key={t.id} className={`${ROW} text-gray-900 dark:text-gray-50`}>
                  <td className={`py-2 pr-2 ${STICKY_COL} max-w-[220px]`}>
                    <a href={t.href} target="_blank" rel="noreferrer" className="font-medium hover:underline">{t.name}</a>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {t.region === "GLOBAL" ? "Worldwide" : t.region} · {t.group}
                    </div>
                  </td>
                  <td className="py-2 px-2 whitespace-nowrap text-xs text-gray-600 dark:text-gray-300">{t.pricing}</td>
                  <td className={TD}>{n(t.questions)}</td>
                  <td className={TD}>
                    {n(t.answers7d)}
                    <Change cur={t.answers7d} prev={t.answersPrev7d} />
                  </td>
                  <td className={TD}>{n(t.answers30d)}</td>
                  <td className={TD}>{n(t.answersAll)}</td>
                  <td className={TD}>{n(t.learners)}</td>
                  <td className={TD}>{n(t.paywallHits30d)}</td>
                  <td className={TD}>
                    {n(t.purchasesAll)}
                    {t.purchases30d > 0 && <span className="text-gray-500 dark:text-gray-400"> ({n(t.purchases30d)})</span>}
                  </td>
                  <td className={TD}>
                    {usd(t.revenueAllCents)}
                    {t.revenue30dCents > 0 && <span className="text-gray-500 dark:text-gray-400"> ({usd(t.revenue30dCents)})</span>}
                  </td>
                </tr>
              ))}
              <tr className={`${ROW} font-semibold text-gray-900 dark:text-gray-50`}>
                <td className={`py-2 pr-2 ${STICKY_COL}`}>All {n(rows.length)} shown</td>
                <td />
                <td />
                <td className={TD}>{n(totals.answers7d)}</td>
                <td className={TD}>{n(totals.answers30d)}</td>
                <td className={TD}>{n(totals.answersAll)}</td>
                <td />
                <td />
                <td className={TD}>{n(totals.purchasesAll)}</td>
                <td className={TD}>{usd(totals.revenueAllCents)}</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>
        <ShowAllButton hidden={top.hidden} all={top.all} onToggle={top.toggle} noun="more tests" />
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Answers are questions answered by everyone (guests included, internal accounts and bots left out). Learners sum distinct people per
          test, so someone on two tests counts twice. Revenue is in US dollars after refunds, credited to the test the purchase came from.
        </p>
      </div>
    </div>
  );
}
