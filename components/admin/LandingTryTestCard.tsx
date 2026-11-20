"use client";

import { CARD, ROW, STICKY_COL, TableScroll, useAdminFetch } from "@/components/admin/AdminTabParts";
import { Variations, VariationFrame } from "@/components/admin/Variations";
import { twoProportionP } from "@/lib/guestPromptTest";
import {
  LANDING_TRY_ENGAGED,
  LANDING_TRY_MILESTONES,
  LANDING_TRY_MIN_LIFT,
  LANDING_TRY_TARGET_PER_ARM,
  LANDING_TRY_TEST_ID,
  landingTryMeans,
  landingTryResult,
  type LandingTryAnswerCounts,
  type LandingTryArm,
  type LandingTryCounts,
} from "@/lib/landingTryTest";

// The "Try one now" layout A/B test (lib/landingTryTest.ts): new visitors on
// an exam landing, half with the shipped layout (a) and half with the
// question first and no Start (b), and what each half did in the next 7 days.

type Payload = {
  test: string | null;
  since: string | null;
  arms: Partial<Record<LandingTryArm, LandingTryCounts>>;
  byExam: Record<string, Partial<Record<LandingTryArm, LandingTryCounts>>>;
  answers?: Partial<Record<LandingTryArm, LandingTryAnswerCounts>>;
  answersSince?: string | null;
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
  a: { text: "A wins: the current layout gets more first answers and costs no sign-ups. Keep it.", cls: "bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200" },
  b: { text: "B wins: no Start gets more first answers and costs no sign-ups. Ship B.", cls: "bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200" },
  tie: { text: "No clear winner at the target: keep A, the current layout.", cls: "bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200" },
};

export function LandingTryTestCard() {
  const { data, error, loading } = useAdminFetch<Payload>("/api/admin/landing-try-test");
  if (loading) return <div className={`${CARD} mb-3 sm:mb-4 text-sm text-gray-500`}>Loading the Try one now test...</div>;
  if (error || !data) return null;
  const live = data.test === LANDING_TRY_TEST_ID;
  const card = live ? data.arms.a ?? {} : {};
  const control = live ? data.arms.b ?? {} : {};
  const r = landingTryResult(card, control);
  const v = VERDICT[r.verdict];
  const rows: { label: string; key: keyof LandingTryCounts; note?: string }[] = [
    { label: "Answered a question", key: "answered", note: "primary" },
    { label: `Answered ${LANDING_TRY_ENGAGED}+`, key: "engaged" },
    { label: "Made an account", key: "signup", note: "must not drop" },
    { label: "Bought Premium", key: "purchase", note: "watched" },
  ];
  const exams = Object.entries(live ? data.byExam : {})
    .map(([id, a]) => ({ id, n1: a.a?.enrolled ?? 0, x1: a.a?.answered ?? 0, n2: a.b?.enrolled ?? 0, x2: a.b?.answered ?? 0 }))
    .filter((e) => e.n1 + e.n2 >= 40)
    .sort((a, b) => b.n1 + b.n2 - (a.n1 + a.n2))
    .slice(0, 10);
  const ansCard = live ? data.answers?.a ?? {} : {};
  const ansControl = live ? data.answers?.b ?? {} : {};
  const hasAnswers = (ansCard.enrolled ?? 0) + (ansControl.enrolled ?? 0) > 0;
  const m = landingTryMeans(ansCard, ansControl);
  const fmt = (x: number) => x.toFixed(1);

  return (
    <div className={`${CARD} mb-3 sm:mb-4`}>
      <h2 className={H2}>Try one now: current layout or question first?</h2>
      <p className={SUB}>
        New visitors who open an exam landing (never answered anything on Tigertest) are split 50/50. A (control) gets the current layout: Start
        button, then the card. B gets the question straight under the subtitle with no Start button and no &quot;Pick an answer&quot; chip, and
        its label glows a few seconds after the page opens. Each outcome counts once per browser,
        within 7 days of landing.
        {data.since && live && ` Counting since ${data.since.slice(0, 10)}.`}
      </p>
      <p className={`mt-3 rounded-lg px-3 py-2 text-sm font-medium ${v.cls}`}>{v.text}</p>
      <TableScroll className="mt-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-500 dark:text-gray-400">
              <th className={`text-left font-medium pb-2 ${STICKY_COL}`}>Within 7 days</th>
              <th className={TH}>A: current</th>
              <th className={TH}>B: question first</th>
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
      {hasAnswers && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50">How many questions they answered</h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            New visitors since {data.answersSince?.slice(0, 10) ?? "answer counting began"} only ({ansCard.enrolled ?? 0} in A,{" "}
            {ansControl.enrolled ?? 0} in B), each counted up to 7 days after landing. The last few answers of a visit can arrive late, when the
            page is hidden.
          </p>
          <TableScroll className="mt-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 dark:text-gray-400">
                  <th className={`text-left font-medium pb-2 ${STICKY_COL}`}>Answers within 7 days</th>
                  <th className={TH}>A: current</th>
                  <th className={TH}>B: question first</th>
                  <th className={TH}>Difference</th>
                  <th className={TH}>Chance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <tr className={`${ROW} text-gray-900 dark:text-gray-50`}>
                  <td className={`py-2 pr-2 ${STICKY_COL}`}>Average per new visitor</td>
                  <td className={TD}>{fmt(m.a)}</td>
                  <td className={TD}>{fmt(m.b)}</td>
                  <td className={`${TD} font-semibold`}>
                    {m.a >= m.b ? "+" : ""}
                    {fmt(m.a - m.b)}
                  </td>
                  <td className={TD}>{ansCard.enrolled && ansControl.enrolled ? pFmt(m.p) : ""}</td>
                </tr>
                <tr className={`${ROW} text-gray-900 dark:text-gray-50`}>
                  <td className={`py-2 pr-2 ${STICKY_COL}`}>
                    Average per visitor who answered
                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">(any)</span>
                  </td>
                  <td className={TD}>{fmt(m.aPerAnswerer)}</td>
                  <td className={TD}>{fmt(m.bPerAnswerer)}</td>
                  <td className={TD} />
                  <td className={TD} />
                </tr>
                {LANDING_TRY_MILESTONES.map((k) => (
                  <tr key={k} className={`${ROW} text-gray-900 dark:text-gray-50`}>
                    <td className={`py-2 pr-2 ${STICKY_COL}`}>Answered {k}+</td>
                    <td className={TD}>
                      {ansCard.reached?.[k] ?? 0}{" "}
                      <span className="text-gray-500 dark:text-gray-400">({pct(ansCard.reached?.[k], ansCard.enrolled)})</span>
                    </td>
                    <td className={TD}>
                      {ansControl.reached?.[k] ?? 0}{" "}
                      <span className="text-gray-500 dark:text-gray-400">({pct(ansControl.reached?.[k], ansControl.enrolled)})</span>
                    </td>
                    <td className={TD} />
                    <td className={TD} />
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
        </div>
      )}
      {exams.length > 0 && (
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-gray-900 dark:text-gray-50">First answers by exam (40+ new visitors)</summary>
          <TableScroll className="mt-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 dark:text-gray-400">
                  <th className={`text-left font-medium pb-2 ${STICKY_COL}`}>Exam</th>
                  <th className={TH}>A: current</th>
                  <th className={TH}>B: question first</th>
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
        Goal: one arm gets at least {Math.round(LANDING_TRY_MIN_LIFT * 100)} more points of new visitors answering a question, with no drop in
        accounts made, at p under 0.05. With no winner once both arms reach {LANDING_TRY_TARGET_PER_ARM.toLocaleString()} new visitors (enough to
        see a 5-point gap), keep A. Difference is A minus B. Check it at most weekly: reading it every day and stopping on the first good day overstates the win. Purchases are too few to
        decide on and are only watched.
      </p>
      <Variations>
        <VariationFrame name="A: current (control)" note="Start button, then the card." src="/cdl-practice-test?tryq=a" height={640} />
        <VariationFrame name="B: question first" note="No Start, no Pick an answer chip, the label glows after a few seconds." src="/cdl-practice-test?tryq=b" height={640} />
      </Variations>
    </div>
  );
}
