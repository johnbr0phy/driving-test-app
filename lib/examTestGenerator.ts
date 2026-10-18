import { Question } from "@/types";
import { shuffleQuestionOptions } from "./testGenerator";
import { ExamConfig, trainingPartOf } from "./exams";
import { getExamQuestions } from "./examData";
import type { Language } from "@/i18n";

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Questions for one category, sorted by questionId for determinism. */
function getCategoryQuestions(exam: ExamConfig, category: string, language: Language): Question[] {
  return getExamQuestions(exam.id, language)
    .filter((q) => q.category === category)
    .sort((a, b) => a.questionId.localeCompare(b.questionId));
}

/**
 * Generate a practice test: a FIXED, blueprint-weighted slice of every
 * content area (test N takes slice N of each category), so all tests mirror
 * the real exam's distribution. Question order is shuffled per attempt.
 */
export function generateExamTest(exam: ExamConfig, testNumber: number, language: Language = "en"): Question[] {
  if (testNumber < 1 || testNumber > exam.testCount) {
    throw new Error(`Test number must be between 1 and ${exam.testCount}`);
  }
  const questions: Question[] = [];
  for (const [category, perTest] of Object.entries(exam.blueprint)) {
    const pool = getCategoryQuestions(exam, category, language);
    const start = (testNumber - 1) * perTest;
    questions.push(...pool.slice(start, start + perTest));
  }
  return shuffle(questions);
}

/**
 * Fixed, ordered question list for a training set (one or more categories),
 * or for one part of it when the set is split (see trainingParts).
 */
export function getExamTrainingSetQuestions(
  exam: ExamConfig,
  setNumber: number,
  part?: number,
  language: Language = "en"
): Question[] {
  const def = exam.trainingSets.find((s) => s.setNumber === setNumber);
  if (!def) throw new Error(`Set number must be between 1 and ${exam.trainingSets.length}`);
  return getExamQuestions(exam.id, language)
    .filter((q) => def.categories.includes(q.category))
    .filter((q) => part === undefined || trainingPartOf(def.id, q.questionId) === part)
    .sort((a, b) => a.questionId.localeCompare(b.questionId));
}

/** Next unmastered question in a set; wrong answers are re-queued to the back. */
export function getNextExamTrainingSetQuestion(
  exam: ExamConfig,
  setNumber: number,
  masteredIds: string[],
  wrongQueue: string[] = [],
  currentQuestionId: string | null = null,
  part?: number,
  language: Language = "en"
): Question | null {
  const questions = getExamTrainingSetQuestions(exam, setNumber, part, language);
  let unmastered = questions.filter((q) => !masteredIds.includes(q.questionId));
  if (unmastered.length === 0) return null;
  if (currentQuestionId && unmastered.length > 1) {
    unmastered = unmastered.filter((q) => q.questionId !== currentQuestionId);
  }
  const fresh = unmastered.filter((q) => !wrongQueue.includes(q.questionId));
  if (fresh.length > 0) return fresh[0];
  for (const qId of wrongQueue) {
    const question = unmastered.find((q) => q.questionId === qId);
    if (question) return question;
  }
  return unmastered[0];
}

export { shuffle, shuffleQuestionOptions };
