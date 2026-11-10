/**
 * What Tigertest Premium locks on a v1 registry exam (Nov 2026): the final
 * training step and the final practice test of every exam. Everything before
 * them is free ("start for free"). One purchase, the DMV's, opens them all.
 *
 *   EPA 608        steps 5 and 9   (Type III set, Practice Test 4)
 *   Life in the UK steps 4 and 12  (last chapter set, Test 8)
 *   Motorcycle     steps 7 and 8   (Training Set 4, Practice Test 4)
 *   A state version (one full-length test): the last set only, so its one
 *   test stays free.
 *
 * A step someone already has work in stays open, class students are never
 * locked (hooks/useExamLocks.ts), and gating is client-side like the DMV's.
 * The DMV keeps its own rules in the store.
 */
import { ExamConfig, TrainingPart, examTestIds, examTrainingParts } from "./exams";

/** Store ID of the Premium practice test, or null when the exam has only one test. */
export function lockedTestId(exam: ExamConfig): number | null {
  if (exam.testCount < 2) return null;
  const ids = examTestIds(exam);
  return ids[ids.length - 1] ?? null;
}

/** The Premium training step: the last one on the dashboard (a split set locks only its last part). */
export function lockedTrainingPart(exam: ExamConfig): TrainingPart | null {
  const parts = examTrainingParts(exam);
  return parts.length > 1 ? parts[parts.length - 1] : null;
}

/**
 * Paywall item ids from v1 exam locks start with this, so the DMV
 * paywall-abandon email never quotes one back with DMV copy.
 */
export const EXAM_PAYWALL_PREFIX = "exam_";
