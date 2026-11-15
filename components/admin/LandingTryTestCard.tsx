"use client";

import { CARD, ROW, STICKY_COL, TableScroll, useAdminFetch } from "@/components/admin/AdminTabParts";
import { Variations, VariationFrame } from "@/components/admin/Variations";
import { twoProportionP } from "@/lib/guestPromptTest";
import {
  LANDING_TRY_ENGAGED,
  LANDING_TRY_MIN_LIFT,
  LANDING_TRY_TARGET_PER_ARM,
  LANDING_TRY_TEST_ID,
  landingTryResult,
  type LandingTryArm,
  type LandingTryCounts,
} from "@/lib/landingTryTest";

// The "Try one now" A/B test (lib/landingTryTest.ts): new visitors on an exam
// landing, half with a playable question in the hero and half without, and
// what each half did in the next 7 days.

type Payload = {
  test: string | null;
  since: string | null;
  arms: Partial<Record<LandingTryArm, LandingTryCounts>>;
  byExam: Record<string, Partial<Record<LandingTryArm, LandingTryCounts>>>;
};

const H2 = "text-base font-semibold text-gray-900 dark:text-gray-50";
const SUB = "mt-1 text-sm text-gray-600 dark:text-gray-300";
const TH = "text-right font-medium pb-2 px-2 whitespace-nowrap";
const TD = "py-2 px-2 text-right tabular-nums whitespace-nowrap";
const pct = (x: number | undefined, n: number | undefined) => (n ? `${(((x ?? 0) / n) * 100).toFixed(1)}%` : "n/a");
const pFmt = (p: number) =>
  p < 0.05 ? <span className="font-semibold text-green-700 dark:text-green-300">p {p.toFixed(3)}</span> : `p ${p.toFixed(2)}`;

const VERDICT: Record<string, { text: string; cls: string }> = {
  too_early: { text: "Too early to read: under 100 new visitors in an arm.", cls: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200" },
  running: { text: "Running: no decision yet.", cls: "bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-200" },
  ship: { text: "Ship it: the card gets more first answers and costs no sign-ups.", cls: "bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200" },
  drop: { text: "Drop it: both arms reached the target without a clear lift.", cls: "bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200" },
};

export function LandingTryTestCard() {
  const { data, error, loading } = useAdminFetch<Payload>("/api/admin/landing-try-test");
  if (loading) return <div className={`${CARD} mb-3 sm:mb-4 text-sm text-gray-500`}>Loading the Try one now test...</div>;
  if (error || !data) return null;
  const live = data.test === LANDING_TRY_TEST_ID;
  const card = live ? data.arms.card ?? {} : {};
  const control = live ? data.arms.control ?? {} : {};
  const r = landingTryResult(card, control);
  const v = VERDICT[r.verdict];
  const rows: { label: string; key: keyof LandingTryCounts; note?: string }[] = [
    { label: "Answered a question", key: "answered", note: "primary" },
    { label: `Answered ${LANDING_TRY_ENGAGED}+`, key: "engaged" },
    { label: "Made an account", key: "signup", note: "must not drop" },
    { label: "Bought Premium", key: "purchase", note: "watched" },
  ];
  const exams = Object.entries(live ? data.byExam : {})
    .map(([id, a]) => ({ id, n1: a.card?.enrolled ?? 0, x1: a.card?.answered ?? 0, n2: a.control?.enrolled ?? 0, x2: a.control?.answered ?? 0 }))
    .filter((e) => e.n1 + e.n2 >= 40)
    .sort((a, b) => b.n1 + b.n2 - (a.n1 + a.n2))
    .slice(0, 10);

  return (
    <div className={`${CARD} mb-3 sm:mb-4`}>
      <h2 className={H2}>Does a question on the landing get people practicing?</h2>
      <p className={SUB}>
        New visitors who open an exam landing (never answered anything on Tigertest) are split 50/50: half see a playable question under the Start
        button, half the page without it. Each outcome counts once per browser, within 7 days of landing.
        {data.since && live && ` Counting since ${data.since.slice(0, 10)}.`}
      </p>
      <p className={`mt-3 rounded-lg px-3 py-2 text-sm font-medium ${v.cls}`}>{v.text}</p>
      <TableScroll className="mt-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-500 dark:text-gray-400">
              <th className={`text-left font-medium pb-2 ${STICKY_COL}`}>Within 7 days</th>
              <th className={TH}>With question</th>
              <th className={TH}>Without</th>
              <th className={TH}>Difference</th>
              <th className={TH}>Chance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            <tr className={`${ROW} text-gray-900 dark:text-gray-50`}>
              <td className={`py-2 pr-2 ${STICKY_COL}`}>New visitors</td>
              <td className={TD}>{card.enrolled ?? 0}</td>
              <td className={TD}>{control.enrolled ?? 0}</td>
              <td className={TD} />
              <td className={TD} />
            </tr>
            {rows.map((row) => {
              const a = (card[row.key] ?? 0) / (card.enrolled || 1);
              const b = (control[row.key] ?? 0) / (control.enrolled || 1);
              const p = twoProportionP(card[row.key] ?? 0, card.enrolled ?? 0, control[row.key] ?? 0, control.enrolled ?? 0);
              const both = !!card.enrolled && !!control.enrolled;
              return (
                <tr key={row.key} className={`${ROW} text-gray-900 dark:text-gray-50`}>
                  <td className={`py-2 pr-2 ${STICKY_COL}`}>
                    {row.label}
                    {row.note && <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({row.note})</span>}
                  </td>
                  <td className={TD}>
                    {card[row.key] ?? 0} <span className="text-gray-500 dark:text-gray-400">({pct(card[row.key], card.enrolled)})</span>
                  </td>
                  <td className={TD}>
                    {control[row.key] ?? 0} <span className="text-gray-500 dark:text-gray-400">({pct(control[row.key], control.enrolled)})</span>
                  </td>
                  <td className={`${TD} font-semibold`}>{both ? `${a >= b ? "+" : ""}${((a - b) * 100).toFixed(1)} pts` : "n/a"}</td>
                  <td className={TD}>{both ? pFmt(p) : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableScroll>
      {exams.length > 0 && (
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-gray-900 dark:text-gray-50">First answers by exam (40+ new visitors)</summary>
          <TableScroll className="mt-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 dark:text-gray-400">
                  <th className={`text-left font-medium pb-2 ${STICKY_COL}`}>Exam</th>
                  <th className={TH}>With question</th>
                  <th className={TH}>Without</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {exams.map((e) => (
                  <tr key={e.id} className={`${ROW} text-gray-900 dark:text-gray-50`}>
                    <td className={`py-2 pr-2 ${STICKY_COL} font-mono text-xs`}>{e.id}</td>
                    <td className={TD}>{pct(e.x1, e.n1)} <span className="text-gray-500 dark:text-gray-400">of {e.n1}</span></td>
                    <td className={TD}>{pct(e.x2, e.n2)} <span className="text-gray-500 dark:text-gray-400">of {e.n2}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
        </details>
      )}
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Goal: at least {Math.round(LANDING_TRY_MIN_LIFT * 100)} more points of new visitors answering a question, with no drop in accounts made. Ship
        when that holds at p under 0.05; drop when both arms reach {LANDING_TRY_TARGET_PER_ARM.toLocaleString()} new visitors without it (enough to see
        a 5-point lift). Check it at most weekly: reading it every day and stopping on the first good day overstates the win. Purchases are too few to
        decide on and are only watched.
      </p>
      <Variations>
        <VariationFrame name="Card" note="A playable question in the hero; the screenshots are hidden." src="/cdl-practice-test?tryq=card" height={640} />
        <VariationFrame name="Control" note="The hero as it was: no question, screenshots shown." src="/cdl-practice-test?tryq=control" height={640} />
      </Variations>
    </div>
  );
}
