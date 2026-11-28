import { Question } from "@/types";
import { shuffleQuestionOptions } from "./shuffleOptions";
import { ExamConfig, examTestTotal, isMockTest, trainingPartOf } from "./exams";
import { getExamQuestions } from "./examData";
import type { Language } from "@/i18n";
import { mixTrainingOrder } from "./trainingOrder";

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Questions for one category, sorted by questionId for determinism. */
function getCategoryQuestions(exam: ExamConfig, category: string, language?: Language): Question[] {
  return getExamQuestions(exam.id, language)
    .filter((q) => q.category === category)
    .sort((a, b) => a.questionId.localeCompare(b.questionId));
}

/**
 * Generate a practice test: a FIXED, blueprint-weighted slice of every
 * content area (test N takes slice N of each category), so all tests mirror
 * the real exam's distribution. Question order is shuffled per attempt.
 */
export function generateExamTest(exam: ExamConfig, testNumber: number, language?: Language): Question[] {
  return shuffle(examTestQuestions(exam, testNumber, language));
}

/** The reviewed CA/NJ real estate handoff uses RE-CA-... / RE-NJ-...
 * for local law. Other state builders retain the state's own ID for local
 * items and the national source ID for shared items, including overrides. */
function stateLawQuestion(q: Question): boolean {
  return q.sourceQuestionId === q.questionId || !!q.sourceQuestionId?.startsWith(`RE-${q.state}-`);
}

/** Deal each source and topic across the short forms. Keeping the deal
 * running across groups balances each form's length and share of state law. */
function statePracticeQuestions(exam: ExamConfig, index: number, count: number, language?: Language): Question[] {
  const bank = [...getExamQuestions(exam.id, language)].sort((a, b) =>
    Number(stateLawQuestion(a)) - Number(stateLawQuestion(b)) ||
    a.category.localeCompare(b.category) ||
    a.questionId.localeCompare(b.questionId)
  );
  return bank.filter((_, i) => i % count === index);
}

/** Practice test N's fixed questions, unshuffled (blueprint order). */
export function examTestQuestions(exam: ExamConfig, testNumber: number, language?: Language): Question[] {
  if (testNumber < 1 || testNumber > examTestTotal(exam)) {
    throw new Error(`Test number must be between 1 and ${examTestTotal(exam)}`);
  }
  if (exam.statePracticeCount && testNumber > exam.testCount) {
    return statePracticeQuestions(exam, testNumber - exam.testCount - 1, exam.statePracticeCount, language);
  }
  if (isMockTest(exam, testNumber)) return mockQuestions(exam, testNumber - exam.testCount, language);
  const questions: Question[] = [];
  for (const [category, perTest] of Object.entries(exam.blueprint)) {
    const pool = getCategoryQuestions(exam, category, language);
    const start = (testNumber - 1) * perTest;
    questions.push(...pool.slice(start, start + perTest));
  }
  return questions;
}

/**
 * Full-length mock M: per category, an even spread across the whole pool
 * (position floor((j * count + M - 1) * pool / (count * per))), so each mock
 * mixes old and new questions and two mocks never share one.
 */
function mockQuestions(exam: ExamConfig, mock: number, language?: Language): Question[] {
  const { count, blueprint } = exam.mockExams!;
  const questions: Question[] = [];
  for (const [category, per] of Object.entries(blueprint)) {
    const pool = getCategoryQuestions(exam, category, language);
    for (let j = 0; j < per; j++) {
      const q = pool[Math.floor(((j * count + mock - 1) * pool.length) / (count * per))];
      if (q) questions.push(q);
    }
  }
  return questions;
}

/**
 * Fixed, ordered question list for a training set (one or more categories,
 * or practice test N's questions for a DMV-style test set), or for one part
 * of it when the set is split (see trainingParts).
 */
export function getExamTrainingSetQuestions(
  exam: ExamConfig,
  setNumber: number,
  part?: number,
  language?: Language
): Question[] {
  const def = exam.trainingSets.find((s) => s.setNumber === setNumber);
  if (!def) throw new Error(`Set number must be between 1 and ${exam.trainingSets.length}`);
  if (def.test !== undefined) {
    return examTestQuestions(exam, def.test, language).sort((a, b) => a.questionId.localeCompare(b.questionId));
  }
  return getExamQuestions(exam.id, language)
    .filter((q) => def.categories.includes(q.category))
    .filter((q) => !exam.trainingExcludePrefix || !q.questionId.startsWith(exam.trainingExcludePrefix))
    .filter((q) => part === undefined || trainingPartOf(def.id, q.questionId) === part)
    .sort((a, b) => a.questionId.localeCompare(b.questionId));
}

/** A set's (or part's) questions in the order training asks them: mixed, see lib/trainingOrder.ts. */
export function examTrainingAskOrder(questions: Question[]): Question[] {
  return mixTrainingOrder(questions, (q) => q.questionId, (q) => q.category);
}

/** Next unmastered question in a set; wrong answers are re-queued to the back. */
export function getNextExamTrainingSetQuestion(
  exam: ExamConfig,
  setNumber: number,
  masteredIds: string[],
  wrongQueue: string[] = [],
  currentQuestionId: string | null = null,
  part?: number,
  language?: Language
): Question | null {
  const questions = examTrainingAskOrder(getExamTrainingSetQuestions(exam, setNumber, part, language));
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
