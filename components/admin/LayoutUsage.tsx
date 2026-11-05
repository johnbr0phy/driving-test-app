"use client";

import { useState } from "react";
import { CARD, ROW, STICKY_COL, TableScroll, useAdminFetch } from "@/components/admin/AdminTabParts";
import type { LayoutAgg, LayoutUsagePayload } from "@/lib/layoutUsage";

// "Dashboard layout" card on the /admin Growth tab (/api/admin/layout-usage,
// lib/server/layoutUsage.ts): do exams laid out Set 1, Test 1, Set 2, Test 2
// (like the DMV) get more use than exams with every set first and the tests
// at the end? Accounts only; guests' progress never leaves their browser.

const fmt = (n: number) => n.toLocaleString("en-US");
const rate = (n: number, d: number) => (d > 0 ? (100 * n) / d : 0);
const pct = (n: number, d: number) => (d > 0 ? `${Math.round(rate(n, d))}%` : "—");

function Cells({ a }: { a: LayoutAgg }) {
  return (
    <>
      <td className="py-1.5 pl-3 text-right tabular-nums text-gray-600 dark:text-gray-300">{fmt(a.people)}</td>
      <td className="py-1.5 pl-3 text-right tabular-nums font-semibold text-gray-900 dark:text-gray-50">{pct(a.startedTest, a.people)}</td>
      <td className="py-1.5 pl-3 text-right tabular-nums">{pct(a.finishedTest, a.people)}</td>
      <td className="py-1.5 pl-3 text-right tabular-nums">{a.people ? a.medianAnswers : "—"}</td>
    </>
  );
}

function Head({ first }: { first: string }) {
  return (
    <thead>
      <tr className="text-xs text-gray-500 dark:text-gray-400">
        <th className={`text-left font-medium py-1 pr-3 ${STICKY_COL}`}>{first}</th>
        <th className="text-right font-medium py-1 pl-3">People</th>
        <th className="text-right font-medium py-1 pl-3">Started a test</th>
        <th className="text-right font-medium py-1 pl-3">Finished a test</th>
        <th className="text-right font-medium py-1 pl-3">Median answers</th>
      </tr>
    </thead>
  );
}

function Row({ label, a, sub }: { label: string; a: LayoutAgg; sub?: string }) {
  return (
    <tr className={`${ROW} border-t border-gray-100 dark:border-gray-800`}>
      <td className={`py-1.5 pr-3 ${STICKY_COL}`}>
        <div className="text-gray-900 dark:text-gray-50">{label}</div>
        {sub && <div className="text-[11px] text-gray-500 dark:text-gray-400">{sub}</div>}
      </td>
      <Cells a={a} />
    </tr>
  );
}

export function LayoutUsage() {
  const { data, error, loading, updating } = useAdminFetch<LayoutUsagePayload>("/api/admin/layout-usage");
  const [showExams, setShowExams] = useState(false);

  if (loading) return <div className={`${CARD} mb-6 text-sm text-gray-500 dark:text-gray-400`}>Loading dashboard layout… (scans every account, can take a minute)</div>;
  if (error || !data) return <div className={`${CARD} mb-6 text-sm text-red-600 dark:text-red-400`}>Dashboard layout: {error ?? "no data"}</div>;

  const { cohort: c } = data;
  const change = (g: "interleaved" | "setsFirst") => rate(c[g].after.startedTest, c[g].after.people) - rate(c[g].before.startedTest, c[g].before.people);
  const did = change("interleaved") - change("setsFirst");
  const thin = Math.min(c.interleaved.before.people, c.interleaved.after.people, c.setsFirst.before.people, c.setsFirst.after.people) < 30;

  return (
    <div className={`${CARD} mb-6`}>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-50">Dashboard layout</h3>
        <span className="text-[11px] text-gray-500 dark:text-gray-400">{updating ? "updating…" : `${fmt(data.accounts)} accounts`}</span>
      </div>
      <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
        Interleaved (Set 1, Test 1, Set 2, Test 2, like the DMV) against sets first with the tests at the end. Registry exams only, accounts only, internal accounts skipped.
      </p>

      <h4 className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-50">New users, before and after the {data.switchDate} switch</h4>
      <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
        People who first used an exam {data.before.from} to {data.before.to} (old layout) or {data.after.from} to {data.after.to}, each counted over their first {data.followDays} days. Sets-first exams never changed, so they are the control. Only exams with new users in both windows ({c.interleaved.exams} interleaved, {c.setsFirst.exams} sets first).
      </p>
      {data.after.ready ? (
        <>
          <TableScroll>
            <table className="w-full text-sm">
              <Head first="Group" />
              <tbody>
                <Row label="Switched exams, before" sub="old layout" a={c.interleaved.before} />
                <Row label="Switched exams, after" sub="interleaved" a={c.interleaved.after} />
                <Row label="Sets-first exams, before" sub="control" a={c.setsFirst.before} />
                <Row label="Sets-first exams, after" sub="control" a={c.setsFirst.after} />
              </tbody>
            </table>
          </TableScroll>
          <p className="mt-2 text-sm text-gray-900 dark:text-gray-50">
            Net effect on starting a test:{" "}
            <span className={`font-semibold ${did > 0 ? "text-green-700 dark:text-green-300" : did < 0 ? "text-red-600 dark:text-red-400" : ""}`}>
              {did > 0 ? "+" : ""}
              {did.toFixed(1)} points
            </span>{" "}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              (switched exams {change("interleaved") >= 0 ? "+" : ""}{change("interleaved").toFixed(1)}, control {change("setsFirst") >= 0 ? "+" : ""}{change("setsFirst").toFixed(1)})
            </span>
          </p>
          {thin && <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">Under 30 people in at least one row: read this as a direction, not a result.</p>}
        </>
      ) : (
        <p className="text-xs text-gray-500 dark:text-gray-400">The after window needs {data.followDays} days of follow-up; check back soon.</p>
      )}

      <h4 className="mt-5 mb-1 text-sm font-medium text-gray-900 dark:text-gray-50">All time</h4>
      <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Everyone who used an exam, grouped by its layout today. Different exams draw different people, so this mixes layout with demand.</p>
      <TableScroll>
        <table className="w-full text-sm">
          <Head first="Layout" />
          <tbody>
            <Row label="Interleaved" a={data.allTime.interleaved} />
            <Row label="Sets first" a={data.allTime.setsFirst} />
          </tbody>
        </table>
      </TableScroll>

      <button onClick={() => setShowExams(!showExams)} className="mt-4 text-xs font-medium text-gray-600 dark:text-gray-300 underline">
        {showExams ? "Hide" : "Show"} exams with 10+ people ({data.exams.length})
      </button>
      {showExams && (
        <TableScroll className="mt-2">
          <table className="w-full text-sm">
            <Head first="Exam" />
            <tbody>
              {data.exams.map((e) => (
                <Row key={e.id} label={e.name} sub={e.group === "interleaved" ? "interleaved" : "sets first"} a={e} />
              ))}
            </tbody>
          </table>
        </TableScroll>
      )}
    </div>
  );
}
