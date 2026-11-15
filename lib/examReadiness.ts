// "Am I ready?" for a v1 exam (Nov 2026): one verdict per content area and an
// estimate for the whole exam, from the person's own answers on this device
// or account. The answer people pay for on top of a free course is not more
// questions but whether they will pass and what to fix first.
//
// Per area: the mean of each answered question's accuracy (a question
// answered five times counts once, at its own rate), pulled toward 50% by
// PRIOR questions so three lucky answers do not read as mastery. Areas are
// weighted by their share of a practice test (the exam's blueprint, which
// follows the official outline). An estimate from practice, never the real
// exam's scaled score; the copy says so.

import type { ExamConfig } from "./exams";

export type ReadinessLevel = "ready" | "almost" | "notYet" | "unknown";

export interface AreaReadiness {
  category: string;
  /** Share of a practice test, 0 to 1. */
  weight: number;
  /** Distinct questions answered in the area. */
  answered: number;
  /** Smoothed accuracy, 0 to 100; null until MIN_AREA answers. */
  accuracy: number | null;
  level: ReadinessLevel;
  /** Exam points (of 100) this area is short of the ready line. */
  gap: number;
}

export interface ExamReadiness {
  areas: AreaReadiness[];
  /** Weighted estimate, 0 to 100; null until every area has MIN_AREA answers. */
  estimate: number | null;
  level: ReadinessLevel;
  /** The area with the most points to gain, if any is short. */
  fastest: AreaReadiness | null;
}

export const MIN_AREA = 8;
const PRIOR = 3;
/** "Ready" is a margin over the pass mark: practice questions you have seen before flatter you. */
export const READY_MARGIN = 5;
const ALMOST_BELOW = 10;

export function levelFor(accuracy: number, passPct: number): ReadinessLevel {
  if (accuracy >= passPct + READY_MARGIN) return "ready";
  if (accuracy >= passPct - ALMOST_BELOW) return "almost";
  return "notYet";
}

export function examReadiness(
  exam: Pick<ExamConfig, "blueprint" | "passPct">,
  questionCategory: (questionId: string) => string | undefined,
  performance: { questionId: string; timesCorrect: number; timesWrong: number }[]
): ExamReadiness {
  const total = Object.values(exam.blueprint).reduce((a, b) => a + b, 0) || 1;
  const sums: Record<string, { n: number; acc: number }> = {};
  for (const p of performance) {
    const answered = p.timesCorrect + p.timesWrong;
    if (answered === 0) continue;
    const category = questionCategory(p.questionId);
    if (!category || !(category in exam.blueprint)) continue;
    const s = (sums[category] ??= { n: 0, acc: 0 });
    s.n += 1;
    s.acc += p.timesCorrect / answered;
  }
  const ready = exam.passPct + READY_MARGIN;
  const areas: AreaReadiness[] = Object.entries(exam.blueprint).map(([category, per]) => {
    const s = sums[category] ?? { n: 0, acc: 0 };
    const weight = per / total;
    if (s.n < MIN_AREA) return { category, weight, answered: s.n, accuracy: null, level: "unknown", gap: 0 };
    const accuracy = Math.round((100 * (s.acc + PRIOR * 0.5)) / (s.n + PRIOR));
    return { category, weight, answered: s.n, accuracy, level: levelFor(accuracy, exam.passPct), gap: Math.max(0, ready - accuracy) * weight };
  });
  const known = areas.every((a) => a.accuracy !== null);
  const estimate = known ? Math.round(areas.reduce((sum, a) => sum + (a.accuracy ?? 0) * a.weight, 0)) : null;
  let level: ReadinessLevel = "unknown";
  if (estimate !== null) {
    level = levelFor(estimate, exam.passPct);
    // One weak area can sink a real exam even when the average clears.
    if (level === "ready" && areas.some((a) => a.level === "notYet")) level = "almost";
  }
  const short = areas.filter((a) => a.gap > 0).sort((a, b) => b.gap - a.gap);
  return { areas, estimate, level, fastest: short[0] ?? null };
}
