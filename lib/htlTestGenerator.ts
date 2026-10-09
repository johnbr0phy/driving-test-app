import { Question } from "@/types";
import htlQuestionsData from "@/data/htl-questions.json";
import { shuffleQuestionOptions } from "./testGenerator";
import {
  HTL_TEST_BLUEPRINT,
  HTL_TEST_COUNT,
  HTL_TRAINING_SETS,
  HTLCategory,
  getHTLTrainingSetDef,
} from "./htlConfig";

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getHTLQuestionsData(): Question[] {
  return htlQuestionsData as Question[];
}

/** Questions for one content area, sorted by questionId for determinism. */
function getCategoryQuestions(category: HTLCategory): Question[] {
  return getHTLQuestionsData()
    .filter((q) => q.category === category)
    .sort((a, b) => a.questionId.localeCompare(b.questionId));
}

/**
 * Generate an HTL practice test (4 tests, 50 questions each).
 *
 * Each test gets a FIXED, blueprint-weighted slice of every content area
 * (test N takes slice N of each category), so all four tests mirror the real
 * exam's distribution. Question order is shuffled per attempt.
 */
export function generateHTLTest(testNumber: number): Question[] {
  if (testNumber < 1 || testNumber > HTL_TEST_COUNT) {
    throw new Error(`Test number must be between 1 and ${HTL_TEST_COUNT}`);
  }

  const questions: Question[] = [];
  (Object.keys(HTL_TEST_BLUEPRINT) as HTLCategory[]).forEach((category) => {
    const perTest = HTL_TEST_BLUEPRINT[category];
    const pool = getCategoryQuestions(category);
    const start = (testNumber - 1) * perTest;
    questions.push(...pool.slice(start, start + perTest));
  });

  return shuffle(questions);
}

/** Fixed, ordered question list for a training set (one per content area). */
export function getHTLTrainingSetQuestions(setNumber: number): Question[] {
  const def = getHTLTrainingSetDef(setNumber);
  if (!def) {
    throw new Error(`Set number must be between 1 and ${HTL_TRAINING_SETS.length}`);
  }
  return getCategoryQuestions(def.category);
}

/** Next unmastered question in a set; wrong answers are re-queued to the back. */
export function getNextHTLTrainingSetQuestion(
  setNumber: number,
  masteredIds: string[],
  wrongQueue: string[] = [],
  currentQuestionId: string | null = null
): Question | null {
  const questions = getHTLTrainingSetQuestions(setNumber);

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

/** Random question across the whole bank (free-practice mode). */
export function getHTLTrainingQuestion(
  masteredQuestionIds: string[] = [],
  lastQuestionId: string | null = null
): Question | null {
  let available = getHTLQuestionsData().filter(
    (q) => !masteredQuestionIds.includes(q.questionId)
  );
  if (available.length === 0) return null;

  if (lastQuestionId && available.length > 1) {
    available = available.filter((q) => q.questionId !== lastQuestionId);
  }

  return available[Math.floor(Math.random() * available.length)];
}

export { shuffle, shuffleQuestionOptions };
