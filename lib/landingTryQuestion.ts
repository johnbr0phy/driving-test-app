import { getExamTrainingSetQuestions } from "@/lib/examTestGenerator";
import { examBaseLanguage, examSetId, getExamByPath, localizeExam, trainingParts } from "@/lib/exams";
import { getExamRoutes } from "@/lib/examRoutes";
import { getSignIdForQuestion } from "@/lib/signImages";
import { hasPositionDependentAnswers } from "@/lib/shuffleOptions";
import type { Language } from "@/i18n";

// ─── "Try one now" on a landing ──────────────────────────────────────────────
// One real question from training set 1, shown playable in the landing hero
// so a visitor can answer before choosing anything. Its answer is recorded
// in set 1 like any training answer, and "Keep going" opens that set.
// Picked on the server from the bank the page already imports for its sample
// questions; a page that does not import its bank shows no card.

export type LandingTryQuestion = {
  examId: string;
  setId: number;
  questionId: string;
  category: string;
  stem: string;
  /** Options as shown, rotated so keys do not always sit at one letter. */
  options: [string, string, string, string];
  correctIndex: number;
  /** Bank letter of each shown option ("CDAB"), for the option pick counts. */
  optionOrder: string;
  explanation: string;
  practiceHref: string;
};

const LETTERS = ["A", "B", "C", "D"] as const;

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function pickLandingTryQuestion(dashboardHref: string, lang?: Language): LandingTryQuestion | null {
  const base = getExamByPath(dashboardHref);
  if (!base) return null;
  const language = lang ?? examBaseLanguage(base);
  const exam = localizeExam(base, language);
  const def = exam.trainingSets.find((s) => s.setNumber === 1);
  if (!def) return null;
  const split = trainingParts(def).length > 1;
  // An empty pool means the page did not import its bank: no card.
  let pool;
  try {
    pool = getExamTrainingSetQuestions(exam, 1, split ? 1 : undefined, language);
  } catch {
    return null;
  }
  const q = pool.find(
    (x) => !getSignIdForQuestion(x.questionId) && !hasPositionDependentAnswers(x) && x.explanation && x.optionD,
  );
  if (!q) return null;
  const bank = [q.optionA, q.optionB, q.optionC, q.optionD];
  const key = Math.max(0, LETTERS.indexOf(q.correctAnswer as (typeof LETTERS)[number]));
  const r = hash(q.questionId) % 4;
  const order = [0, 1, 2, 3].map((i) => (i + r) % 4);
  const routes = getExamRoutes(base.id, language);
  return {
    examId: base.id,
    setId: examSetId(base, 1),
    questionId: q.questionId,
    category: q.category,
    stem: q.question,
    options: order.map((i) => bank[i]) as LandingTryQuestion["options"],
    correctIndex: order.indexOf(key),
    optionOrder: order.map((i) => LETTERS[i]).join(""),
    explanation: q.explanation,
    practiceHref: routes.training(1, split ? 1 : undefined),
  };
}
