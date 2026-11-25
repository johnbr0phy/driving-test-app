"use client";

import { CARD, ROW, STICKY_COL, TableScroll, useAdminFetch } from "@/components/admin/AdminTabParts";
import { twoProportionP } from "@/lib/guestPromptTest";
import {
  RANK_MIN_LIFT,
  RANK_TARGET_PER_ARM,
  RANK_TEST_ID,
  rankTestResult,
  type RankArm,
  type RankArmCounts,
} from "@/lib/dailyRankTest";

// The daily rank A/B test (lib/dailyRankTest.ts): every answering browser
// split 50/50 into control (no rank) and rank (header chip plus the rank card
// at the end of every session).

type Payload = {
  test: string | null;
  since: string | null;
  arms: Partial<Record<RankArm, RankArmCounts>>;
  enrolledToday: Record<RankArm, number>;
};

const H2 = "text-base font-semibold text-gray-900 dark:text-gray-50";
const SUB = "mt-1 text-sm text-gray-600 dark:text-gray-300";
const TH = "text-right font-medium pb-2 px-2 whitespace-nowrap";
const TD = "py-2 px-2 text-right tabular-nums whitespace-nowrap";
const pct = (x: number | undefined, n: number) => (n ? `${(((x ?? 0) / n) * 100).toFixed(1)}%` : "n/a");
const pFmt = (p: number) =>
  p < 0.05 ? <span className="font-semibold text-green-700 dark:text-green-300">p {p.toFixed(3)}</span> : `p ${p.toFixed(2)}`;

const VERDICT: Record<string, { text: string; cls: string }> = {
  too_early: { text: "Too early to read: under 200 browsers in an arm have had a next day.", cls: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200" },
  running: { text: "Running: no decision yet.", cls: "bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-200" },
  rank: { text: "Rank wins: more people come back the next day and Premium does not drop. Ship it.", cls: "bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200" },
  control: { text: "Control wins: fewer people come back with the rank. Take it out.", cls: "bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200" },
  tie: { text: "No clear winner at the target: keep control (no rank).", cls: "bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200" },
};

export function DailyRankTestCard() {
  const { data, error, loading } = useAdminFetch<Payload>("/api/admin/rank-test");
  if (loading) return <div className={`${CARD} mb-3 sm:mb-4 text-sm text-gray-500`}>Loading the daily rank test...</div>;
  if (error || !data) return null;
  const live = data.test === RANK_TEST_ID;
  const control = live ? data.arms.control ?? {} : {};
  const rank = live ? data.arms.rank ?? {} : {};
  const eligible = {
    control: Math.max(0, (control.enrolled ?? 0) - (data.enrolledToday?.control ?? 0)),
    rank: Math.max(0, (rank.enrolled ?? 0) - (data.enrolledToday?.rank ?? 0)),
  };
  const r = rankTestResult(control, rank, eligible);
  const v = VERDICT[r.verdict];
  const both = eligible.control > 0 && eligible.rank > 0;
  const returnRate = (c: RankArmCounts, n: number) => (n ? (c.returned ?? 0) / n : 0);
  const buyRate = (c: RankArmCounts) => (c.enrolled ? (c.purchase ?? 0) / c.enrolled : 0);
  const buyP = twoProportionP(rank.purchase ?? 0, rank.enrolled ?? 0, control.purchase ?? 0, control.enrolled ?? 0);
  const diff = (a: number, b: number) => `${a >= b ? "+" : ""}${((a - b) * 100).toFixed(1)} pts`;

  return (
    <div className={`${CARD} mb-3 sm:mb-4`}>
      <h2 className={H2}>Daily rank: does &quot;Top 14% today&quot; bring people back?</h2>
      <p className={SUB}>
        Every browser that answers a question is split 50/50 at its first answer. Control sees no rank. Rank sees a chip in the bar while training and in drills
        (&quot;41 correct · Top 14%&quot;, in place of View stats and the DMV stats upsell; never on practice tests) and a rank card at the end of every test and set. Next-day return counts browsers that answer again on
        the local day after they joined, out of those that joined before today. A win needs {Math.round(RANK_MIN_LIFT * 100)}+ points at p &lt;
        0.05 with no drop in Premium; the target is {RANK_TARGET_PER_ARM.toLocaleString()} per arm.
        {data.since && live && ` Counting since ${data.since.slice(0, 10)}.`}
      </p>
      <p className={`mt-3 rounded-lg px-3 py-2 text-sm font-medium ${v.cls}`}>{v.text}</p>
      <TableScroll className="mt-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-500 dark:text-gray-400">
              <th className={`text-left font-medium pb-2 ${STICKY_COL}`}>Metric</th>
              <th className={TH}>Control</th>
              <th className={TH}>Rank</th>
              <th className={TH}>Difference</th>
              <th className={TH}>Chance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            <tr className={`${ROW} text-gray-900 dark:text-gray-50`}>
              <td className={`py-2 pr-2 ${STICKY_COL}`}>Browsers (had a next day)</td>
              <td className={TD}>
                {control.enrolled ?? 0} <span className="text-gray-500 dark:text-gray-400">({eligible.control})</span>
              </td>
              <td className={TD}>
                {rank.enrolled ?? 0} <span className="text-gray-500 dark:text-gray-400">({eligible.rank})</span>
              </td>
              <td className={TD} />
              <td className={TD} />
            </tr>
            <tr className={`${ROW} text-gray-900 dark:text-gray-50`}>
              <td className={`py-2 pr-2 ${STICKY_COL}`}>
                Came back next day <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">(primary)</span>
              </td>
              <td className={TD}>
                {control.returned ?? 0} <span className="text-gray-500 dark:text-gray-400">({pct(control.returned, eligible.control)})</span>
              </td>
              <td className={TD}>
                {rank.returned ?? 0} <span className="text-gray-500 dark:text-gray-400">({pct(rank.returned, eligible.rank)})</span>
              </td>
              <td className={`${TD} font-semibold`}>{both ? diff(returnRate(rank, eligible.rank), returnRate(control, eligible.control)) : "n/a"}</td>
              <td className={TD}>{both ? pFmt(r.pReturn) : ""}</td>
            </tr>
            <tr className={`${ROW} text-gray-900 dark:text-gray-50`}>
              <td className={`py-2 pr-2 ${STICKY_COL}`}>Questions per session</td>
              <td className={TD}>{r.perSession.control.toFixed(1)}</td>
              <td className={TD}>{r.perSession.rank.toFixed(1)}</td>
              <td className={`${TD} font-semibold`}>
                {r.perSession.rank >= r.perSession.control ? "+" : ""}
                {(r.perSession.rank - r.perSession.control).toFixed(1)}
              </td>
              <td className={TD} />
            </tr>
            <tr className={`${ROW} text-gray-900 dark:text-gray-50`}>
              <td className={`py-2 pr-2 ${STICKY_COL}`}>
                Bought Premium <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">(must not drop)</span>
              </td>
              <td className={TD}>
                {control.purchase ?? 0} <span className="text-gray-500 dark:text-gray-400">({pct(control.purchase, control.enrolled ?? 0)})</span>
              </td>
              <td className={TD}>
                {rank.purchase ?? 0} <span className="text-gray-500 dark:text-gray-400">({pct(rank.purchase, rank.enrolled ?? 0)})</span>
              </td>
              <td className={`${TD} font-semibold`}>{control.enrolled && rank.enrolled ? diff(buyRate(rank), buyRate(control)) : "n/a"}</td>
              <td className={TD}>{control.enrolled && rank.enrolled ? pFmt(buyP) : ""}</td>
            </tr>
          </tbody>
        </table>
      </TableScroll>
    </div>
  );
}
