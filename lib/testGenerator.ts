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
export function generateTest(testNumber: number, state: string): Question[] {
  const allQuestions = questionsData as Question[];

  // Get universal questions (type: "Universal", state: "ALL")
  const universalQuestions = allQuestions.filter(
    (q) => q.type === "Universal" && q.state === "ALL"
  );

  // Get state-specific questions
  const stateQuestions = allQuestions.filter(
    (q) => q.type === "State-Specific" && q.state === state
  );

  // Shuffle both sets
  const shuffledUniversal = shuffle(universalQuestions);
  const shuffledState = shuffle(stateQuestions);

  // Distribution based on test number (as per spec)
  const distributions = [
    { universal: 37, state: 13 }, // Test 1
    { universal: 38, state: 12 }, // Test 2
    { universal: 37, state: 13 }, // Test 3
    { universal: 38, state: 12 }, // Test 4
  ];

  const distribution = distributions[testNumber - 1] || distributions[0];

  // Calculate start indices to avoid question overlap between tests
  const startUniversal = (testNumber - 1) * 37;
  const startState = (testNumber - 1) * 12;

  // Get slices for this test
  const testUniversal = shuffledUniversal.slice(
    startUniversal,
    startUniversal + distribution.universal
  );
  const testState = shuffledState.slice(
    startState,
    startState + distribution.state
  );

  // Intersperse state questions among universal questions
  return intersperseQuestions(testUniversal, testState);
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
