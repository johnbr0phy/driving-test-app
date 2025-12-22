import { Question } from "@/types";
import questionsData from "@/data/questions.json";

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
export function generateTest(testNumber: number, state: string): Question[] {
  const allQuestions = questionsData as Question[];

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

// Get random question for training mode
export function getTrainingQuestion(state: string, excludeIds: string[] = []): Question | null {
  const allQuestions = questionsData as Question[];

  // Get questions for this state (universal + state-specific)
  const availableQuestions = allQuestions.filter(
    (q) =>
      !excludeIds.includes(q.questionId) &&
      (q.state === "ALL" || q.state === state)
  );

  if (availableQuestions.length === 0) {
    return null; // No more questions available
  }

  // Return a random question
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
}
