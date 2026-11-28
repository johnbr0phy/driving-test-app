/**
 * What Tigertest Premium locks on a v1 registry exam: the last half of the
 * dashboard, the DMV's shape (Nov 22 2026, after the lock share test; Nov 14
 * to 22 the last quarter; before that, one training step and one test on
 * every exam). Everything before it is free ("start for free"). One
 * purchase, the DMV's, opens them all.
 *
 * The count is 50% of the dashboard's steps (training steps plus practice
 * tests), rounded, at least one, and the locked steps are the last ones in
 * dashboard order, so a longer exam locks more. Practice Test 1 and at least
 * one training step always stay free:
 *
 *   Motorcycle     8 steps   Sets 3 and 4, Practice Tests 3 and 4
 *   A state version: the first short test and the original full-length
 *   exam stay free. Premium covers the later eligible steps.
 *
 * A step someone already has work in stays open, class students are never
 * locked (hooks/useExamLocks.ts), and gating is client-side like the DMV's.
 * The DMV keeps its own rules in the store.
 *
 * v2 Premium exams lock half too (V2_LOCKED_SHARE, lib/v2/registry.ts).
 *
 * An exam can instead mark a block of content as Premium (`premiumFrom` on
 * ExamConfig): RBT keeps Training Sets 1 to 3 and Practice Tests 1 to 3
 * free, and Premium opens the last four steps: Training Set 4, Practice
 * Test 4, Practice Test 5 (work scenarios) and a full-length timed mock.
 */
import { ExamConfig, TrainingPart, examDashboardTestIds, examTrainingParts } from "./exams";

/** Share of an exam's dashboard steps that need Premium. */
export const LOCKED_SHARE = 0.5;

/** v2 Premium exams (lib/v2/registry.ts): half too since Nov 22 2026 (a quarter before). */
export const V2_LOCKED_SHARE = 0.5;

/**
 * How many steps of a dashboard with `steps` steps are Premium at `share`
 * (LOCKED_SHARE for v1); at least one step always stays free.
 */
export function lockedStepCount(steps: number, share: number = LOCKED_SHARE): number {
  if (steps < 2) return 0;
  return Math.min(steps - 1, Math.max(1, Math.round(steps * share)));
}

export type ExamStep = { kind: "part"; part: TrainingPart } | { kind: "test"; testId: number };

/** A run of training steps followed by the tests that come after them. */
export type ExamStepGroup = { parts: TrainingPart[]; testIds: number[] };

/** Is this step Premium content under `premiumFrom`? */
function inPremiumBlock(exam: ExamConfig, step: ExamStep): boolean {
  const from = exam.premiumFrom;
  if (!from) return false;
  if (step.kind === "test") return step.testId - exam.idBase >= from.test;
  if (from.set !== undefined && step.part.set.setNumber >= from.set) return true;
  return from.part !== undefined && step.part.partCount > 1 && step.part.part >= from.part;
}

/** Train, test, train, test: test i follows training step ceil((i+1)*P/T). */
function interleave(parts: TrainingPart[], testIds: number[]): ExamStepGroup[] {
  if (parts.length === 0) return testIds.length ? [{ parts: [], testIds: [...testIds] }] : [];
  const groups: ExamStepGroup[] = [];
  parts.forEach((p, n) => {
    const last = groups[groups.length - 1];
    if (last && last.testIds.length === 0) last.parts.push(p);
    else groups.push({ parts: [p], testIds: [] });
    testIds.forEach((testId, i) => {
      if (Math.ceil(((i + 1) * parts.length) / testIds.length) === n + 1) groups[groups.length - 1].testIds.push(testId);
    });
  });
  return groups;
}

/**
 * The dashboard's steps in groups (components/exam/ExamDashboard.tsx), so
 * the last step is always a test. With `premiumFrom` the free steps are laid
 * out first and the Premium block after them, each interleaved the same way.
 */
export function examStepGroups(exam: ExamConfig): ExamStepGroup[] {
  const parts = examTrainingParts(exam);
  const testIds = examDashboardTestIds(exam);
  if (!exam.premiumFrom) return interleave(parts, testIds);
  const premiumPart = (part: TrainingPart) => inPremiumBlock(exam, { kind: "part", part });
  const premiumTest = (testId: number) => inPremiumBlock(exam, { kind: "test", testId });
  return [
    ...interleave(parts.filter((p) => !premiumPart(p)), testIds.filter((t) => !premiumTest(t))),
    ...interleave(parts.filter(premiumPart), testIds.filter(premiumTest)),
  ];
}

/** Every step in dashboard order. */
export function examSteps(exam: ExamConfig): ExamStep[] {
  return examStepGroups(exam).flatMap((g) => [
    ...g.parts.map((part): ExamStep => ({ kind: "part", part })),
    ...g.testIds.map((testId): ExamStep => ({ kind: "test", testId })),
  ]);
}

/** The Premium steps: the `premiumFrom` block, else the last half of the dashboard. */
function lockedSteps(exam: ExamConfig, share: number): ExamStep[] {
  const steps = examSteps(exam);
  if (exam.premiumFrom) return steps.filter((s) => inPremiumBlock(exam, s));
  if (exam.statePracticeCount) {
    const fullLength = exam.idBase + 1;
    const firstShort = exam.idBase + 2;
    const eligible = steps.slice(1).filter((step) =>
      step.kind === "part" || (step.testId !== fullLength && step.testId !== firstShort)
    );
    return eligible.slice(-lockedStepCount(steps.length, share));
  }
  // A one-test exam keeps its test free and locks training steps only.
  if (exam.testCount < 2) {
    const parts = steps.filter((s) => s.kind === "part");
    const n = Math.min(parts.length - 1, lockedStepCount(steps.length, share));
    return n > 0 ? parts.slice(-n) : [];
  }
  const locked = steps.slice(steps.length - lockedStepCount(steps.length, share));
  // Whatever the share, the first practice test stays free.
  const firstTest = steps.find((s) => s.kind === "test");
  return locked.filter((s) => s !== firstTest);
}

/** Store IDs of the Premium practice tests (none when the exam has only one test). */
export function lockedTestIds(exam: ExamConfig, share: number = LOCKED_SHARE): number[] {
  return lockedSteps(exam, share).flatMap((s) => (s.kind === "test" ? [s.testId] : []));
}

/** The Premium training steps (a split set can lock only its last parts). */
export function lockedTrainingParts(exam: ExamConfig, share: number = LOCKED_SHARE): TrainingPart[] {
  return lockedSteps(exam, share).flatMap((s) => (s.kind === "part" ? [s.part] : []));
}

/**
 * Paywall item ids from v1 exam locks start with this, so the
 * paywall follow-up email (lib/paywallAbandon.ts) knows which exam it was.
 */
export const EXAM_PAYWALL_PREFIX = "exam_";
