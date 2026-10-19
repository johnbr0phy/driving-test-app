import { Question } from "@/types";
import type { Language } from "@/i18n";
import questionsDataEn from "@/data/questions.json";
import questionsDataEs from "@/data/questions_es.json";
import questionsDataVi from "@/data/questions_vi.json";
import questionsDataKo from "@/data/questions_ko.json";
import questionsDataZh from "@/data/questions_zh.json";
import { shuffleQuestionOptions } from "./shuffleOptions";

export { shuffleQuestionOptions };

// The Vietnamese bank now mirrors the English one row-for-row, with any
// untranslated string emitted as its English original at build time, so this
// merge is effectively a passthrough. It is kept because it stays correct if
// the bank is ever regenerated with a partial row set again.
// Built lazily on first Vietnamese request.
let questionsViMerged: Question[] | null = null;
function getQuestionsVi(): Question[] {
  if (!questionsViMerged) {
    const viById = new Map(
      (questionsDataVi as Question[]).map((q) => [q.questionId, q])
    );
    questionsViMerged = (questionsDataEn as Question[]).map(
      (q) => viById.get(q.questionId) ?? q
    );
  }
  return questionsViMerged;
}

// The Chinese bank holds only the rows translated so far (the universal
// questions plus the state-specific ones for data/zhStates.ts), so every other
// row falls back to its English original here. Built lazily on first request.
let questionsZhMerged: Question[] | null = null;
function getQuestionsZh(): Question[] {
  if (!questionsZhMerged) {
    const zhById = new Map(
      (questionsDataZh as Question[]).map((q) => [q.questionId, q])
    );
    questionsZhMerged = (questionsDataEn as Question[]).map(
      (q) => zhById.get(q.questionId) ?? q
    );
  }
  return questionsZhMerged;
}

// Get questions data for the specified language
export function getQuestionsData(language: Language = 'en'): Question[] {
  if (language === 'es') return questionsDataEs as Question[];
  if (language === 'vi') return getQuestionsVi();
  // The Korean bank is a full-length mirror of the English one; any string
  // that is not yet translated is emitted as its English original at build
  // time, so no merge step is needed here.
  if (language === 'ko') return questionsDataKo as Question[];
  if (language === 'zh') return getQuestionsZh();
  return questionsDataEn as Question[];
}

// Helper to shuffle array
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get questions for a specific test
// Each test has a FIXED set of questions, but the order is randomized on each attempt
export function generateTest(testNumber: number, state: string, language: Language = 'en'): Question[] {
  const allQuestions = getQuestionsData(language);

  // Get universal questions (type: "Universal", state: "ALL")
  // Sort by questionId for deterministic assignment to tests
  const universalQuestions = allQuestions
    .filter((q) => q.type === "Universal" && q.state === "ALL")
    .sort((a, b) => a.questionId.localeCompare(b.questionId));

  // Get state-specific questions
  // Sort by questionId for deterministic assignment to tests
  const stateQuestions = allQuestions
    .filter((q) => q.type === "State-Specific" && q.state === state)
    .sort((a, b) => a.questionId.localeCompare(b.questionId));

  // Distribution based on test number (as per spec)
  // Test 1-4: 40 universal + 10 state = 50 each
  // Total: 160 universal + 40 state = 200 questions
  const UNIVERSAL_PER_TEST = 40;
  const STATE_PER_TEST = 10;

  // Calculate start indices for fixed question assignment per test
  // Universal: Test 1 gets 0-39, Test 2 gets 40-79, Test 3 gets 80-119, Test 4 gets 120-159
  // State: Test 1 gets 0-9, Test 2 gets 10-19, Test 3 gets 20-29, Test 4 gets 30-39
  const startUniversal = (testNumber - 1) * UNIVERSAL_PER_TEST;
  const startState = (testNumber - 1) * STATE_PER_TEST;

  // Get fixed slices for this test (always the same questions)
  const testUniversal = universalQuestions.slice(
    startUniversal,
    startUniversal + UNIVERSAL_PER_TEST
  );
  const testState = stateQuestions.slice(
    startState,
    startState + STATE_PER_TEST
  );

  // Combine all questions for this test
  const allTestQuestions = [...testUniversal, ...testState];

  // Shuffle the order for this attempt (questions are fixed, order is random)
  return shuffle(allTestQuestions);
}

// Intersperse state questions evenly among universal questions
function intersperseQuestions(universal: Question[], state: Question[]): Question[] {
  const result: Question[] = [];
  const interval = Math.floor(universal.length / state.length);

  let stateIndex = 0;
  for (let i = 0; i < universal.length; i++) {
    result.push(universal[i]);
    if ((i + 1) % interval === 0 && stateIndex < state.length) {
      result.push(state[stateIndex++]);
    }
  }

  // Add any remaining state questions
  while (stateIndex < state.length) {
    result.push(state[stateIndex++]);
  }

  return result;
}

// Get the fixed 50 questions for a training set
// Training set N has the same questions as Test N, in a fixed order
export function getTrainingSetQuestions(setNumber: number, state: string, language: Language = 'en'): Question[] {
  const allQuestions = getQuestionsData(language);

  // Get universal questions (type: "Universal", state: "ALL")
  const universalQuestions = allQuestions
    .filter((q) => q.type === "Universal" && q.state === "ALL")
    .sort((a, b) => a.questionId.localeCompare(b.questionId));

  // Get state-specific questions
  const stateQuestions = allQuestions
    .filter((q) => q.type === "State-Specific" && q.state === state)
    .sort((a, b) => a.questionId.localeCompare(b.questionId));

  const UNIVERSAL_PER_SET = 40;
  const STATE_PER_SET = 10;

  const startUniversal = (setNumber - 1) * UNIVERSAL_PER_SET;
  const startState = (setNumber - 1) * STATE_PER_SET;

  const setUniversal = universalQuestions.slice(
    startUniversal,
    startUniversal + UNIVERSAL_PER_SET
  );
  const setStateQuestions = stateQuestions.slice(
    startState,
    startState + STATE_PER_SET
  );

  // Return in fixed order (not shuffled) for consistent training experience
  return [...setUniversal, ...setStateQuestions];
}

// Get the next unanswered question from a training set
// wrongQueue: questions answered wrong that should be asked later (after all others)
// currentQuestionId: the question just answered - explicitly excluded to prevent immediate repeats
export function getNextTrainingSetQuestion(
  setNumber: number,
  state: string,
  masteredIds: string[],
  wrongQueue: string[] = [],
  currentQuestionId: string | null = null,
  language: Language = 'en'
): Question | null {
  const questions = getTrainingSetQuestions(setNumber, state, language);

  // Find questions not yet mastered
  let unmasteredQuestions = questions.filter(q => !masteredIds.includes(q.questionId));

  if (unmasteredQuestions.length === 0) {
    return null;
  }

  // Explicitly exclude the current question to prevent immediate repeats
  // (unless it's the only one left)
  if (currentQuestionId && unmasteredQuestions.length > 1) {
    unmasteredQuestions = unmasteredQuestions.filter(q => q.questionId !== currentQuestionId);
  }

  // First priority: unmastered questions NOT in the wrong queue
  const freshQuestions = unmasteredQuestions.filter(q => !wrongQueue.includes(q.questionId));
  if (freshQuestions.length > 0) {
    return freshQuestions[0];
  }

  // All remaining questions are in the wrong queue - take the first one (oldest wrong answer)
  // Find the first question from wrongQueue that's still unmastered
  for (const qId of wrongQueue) {
    const question = unmasteredQuestions.find(q => q.questionId === qId);
    if (question) {
      return question;
    }
  }

  // Fallback (shouldn't happen)
  return unmasteredQuestions[0];
}

// Get random question for training mode with mastery system
// Questions answered correctly are excluded until all questions are mastered
// lastQuestionId is excluded to prevent immediate repeats (unless it's the only option)
export function getTrainingQuestion(
  state: string,
  masteredQuestionIds: string[] = [],
  lastQuestionId: string | null = null,
  language: Language = 'en'
): Question | null {
  const allQuestions = getQuestionsData(language);

  // Get questions for this state (universal + state-specific)
  const stateQuestions = allQuestions.filter(
    (q) => q.state === "ALL" || q.state === state
  );

  // Filter out mastered questions
  let availableQuestions = stateQuestions.filter(
    (q) => !masteredQuestionIds.includes(q.questionId)
  );

  if (availableQuestions.length === 0) {
    return null; // All questions mastered - caller should reset mastered list
  }

  // Try to avoid the last question (prevent immediate repeats)
  if (lastQuestionId && availableQuestions.length > 1) {
    availableQuestions = availableQuestions.filter(
      (q) => q.questionId !== lastQuestionId
    );
  }

  // Return a random question
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
}
