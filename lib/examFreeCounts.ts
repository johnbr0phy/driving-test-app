import { examTestTotal, examTrainingParts, getExamById, type ExamConfig } from "@/lib/exams";
import { lockedTestIds, lockedTrainingParts } from "@/lib/examLocks";

/**
 * What a v1 exam gives free and what Premium adds, in questions and practice
 * tests, from the same lock rule the dashboard uses (lib/examLocks.ts). Public
 * copy states these numbers instead of a share ("112 free questions", not
 * "half"), so they always match what a visitor gets.
 *
 * Questions are the training questions: free ones are those in the training
 * steps that stay open. Practice tests draw from the whole bank.
 */
export interface FreeCounts {
  questions: number;
  freeQuestions: number;
  tests: number;
  freeTests: number;
}

export function v1FreeCounts(exam: ExamConfig): FreeCounts {
  const parts = examTrainingParts(exam);
  const locked = new Set(lockedTrainingParts(exam).map((p) => `${p.set.id}:${p.part}`));
  const questions = parts.reduce((sum, p) => sum + p.size, 0);
  const freeQuestions = parts.filter((p) => !locked.has(`${p.set.id}:${p.part}`)).reduce((sum, p) => sum + p.size, 0);
  const tests = examTestTotal(exam);
  return { questions, freeQuestions, tests, freeTests: tests - lockedTestIds(exam).length };
}

/** The counts for an exam id, or null for anything that is not a v1 exam with Premium steps. */
export function examFreeCounts(examId: string): FreeCounts | null {
  const exam = getExamById(examId);
  if (!exam) return null;
  const c = v1FreeCounts(exam);
  return c.freeQuestions < c.questions || c.freeTests < c.tests ? c : null;
}

/**
 * The DMV in every state: four training sets and four practice tests of 50,
 * the last two of each Premium (the store's own rule, docs/claude/dmv.md).
 */
export const DMV_FREE_COUNTS: FreeCounts = { questions: 200, freeQuestions: 100, tests: 4, freeTests: 2 };

/** "1 practice test" / "2 practice tests". */
export const testsLabel = (n: number) => `${n} practice test${n === 1 ? "" : "s"}`;

/**
 * One English sentence for a landing's facts block and structured data:
 * "112 questions and 2 practice tests are free with no account; Premium adds
 * the other 88 questions and 2 more practice tests."
 */
export function freeCountsSentence(c: FreeCounts): string {
  const moreQ = c.questions - c.freeQuestions;
  const moreT = c.tests - c.freeTests;
  const adds = [moreQ > 0 ? `the other ${moreQ.toLocaleString("en-US")} questions` : "", moreT > 0 ? `${moreT} more ${moreT === 1 ? "practice test" : "practice tests"}` : ""]
    .filter(Boolean)
    .join(" and ");
  return `${c.freeQuestions.toLocaleString("en-US")} questions and ${testsLabel(c.freeTests)} are free with no account; Premium adds ${adds}.`;
}
