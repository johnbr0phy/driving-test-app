/**
 * What Tigertest Premium locks on a v1 registry exam: the last quarter of the
 * dashboard (Nov 14 2026; before that, one training step and one test on
 * every exam). Everything before it is free ("start for free"). One
 * purchase, the DMV's, opens them all.
 *
 * The count is 25% of the dashboard's steps (training steps plus practice
 * tests), rounded, at least one, and the locked steps are the last ones in
 * dashboard order, so a longer exam locks more:
 *
 *   Motorcycle     8 steps   locks 7 and 8        (last set, Practice Test 4)
 *   EPA 608        9 steps   locks 5 and 9        (Type III set, Practice Test 4)
 *   Life in the UK 12 steps  locks 10, 11 and 12  (last chapter set, Tests 7 and 8)
 *   CDL            longer still, so more of its last sets and tests
 *   A state version (one full-length test): its last training steps only, so
 *   its one test stays free.
 *
 * A step someone already has work in stays open, class students are never
 * locked (hooks/useExamLocks.ts), and gating is client-side like the DMV's.
 * The DMV keeps its own rules in the store.
 */
import { ExamConfig, TrainingPart, examTestIds, examTrainingParts } from "./exams";

/** Share of an exam's dashboard steps that need Premium. */
export const LOCKED_SHARE = 0.25;

/** How many steps of a dashboard with `steps` steps are Premium. */
export function lockedStepCount(steps: number): number {
  if (steps < 2) return 0;
  return Math.min(steps - 1, Math.max(1, Math.round(steps * LOCKED_SHARE)));
}

export type ExamStep = { kind: "part"; part: TrainingPart } | { kind: "test"; testId: number };

/**
 * Every step in dashboard order (components/exam/ExamDashboard.tsx): test i
 * follows training step ceil((i+1)*P/T), so the last step is always a test.
 */
export function examSteps(exam: ExamConfig): ExamStep[] {
  const parts = examTrainingParts(exam);
  const testIds = examTestIds(exam);
  if (parts.length === 0) return testIds.map((testId) => ({ kind: "test", testId }));
  const steps: ExamStep[] = [];
  parts.forEach((part, p) => {
    steps.push({ kind: "part", part });
    testIds.forEach((testId, i) => {
      if (Math.ceil(((i + 1) * parts.length) / testIds.length) === p + 1) steps.push({ kind: "test", testId });
    });
  });
  return steps;
}

/** The Premium steps: the last quarter of the dashboard. */
function lockedSteps(exam: ExamConfig): ExamStep[] {
  const steps = examSteps(exam);
  // A one-test exam keeps its test free and locks training steps only.
  if (exam.testCount < 2) {
    const parts = steps.filter((s) => s.kind === "part");
    const n = Math.min(parts.length - 1, lockedStepCount(steps.length));
    return n > 0 ? parts.slice(-n) : [];
  }
  return steps.slice(steps.length - lockedStepCount(steps.length));
}

/** Store IDs of the Premium practice tests (none when the exam has only one test). */
export function lockedTestIds(exam: ExamConfig): number[] {
  return lockedSteps(exam).flatMap((s) => (s.kind === "test" ? [s.testId] : []));
}

/** The Premium training steps (a split set can lock only its last parts). */
export function lockedTrainingParts(exam: ExamConfig): TrainingPart[] {
  return lockedSteps(exam).flatMap((s) => (s.kind === "part" ? [s.part] : []));
}

/**
 * Paywall item ids from v1 exam locks start with this, so the DMV
 * paywall-abandon email never quotes one back with DMV copy.
 */
export const EXAM_PAYWALL_PREFIX = "exam_";
