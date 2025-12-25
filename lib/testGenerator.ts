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

// Shuffle the answer options for a question (returns new question with shuffled options)
export function shuffleQuestionOptions(question: Question): Question {
  const options = [
    { letter: 'A', text: question.optionA },
    { letter: 'B', text: question.optionB },
    { letter: 'C', text: question.optionC },
    { letter: 'D', text: question.optionD },
  ];

  const shuffled = shuffle(options);

  // Find new position of correct answer
  const correctOptionText = question[`option${question.correctAnswer}` as keyof Question] as string;
  const newCorrectIndex = shuffled.findIndex(opt => opt.text === correctOptionText);
  const newCorrectLetter = ['A', 'B', 'C', 'D'][newCorrectIndex];

  return {
    ...question,
    optionA: shuffled[0].text,
    optionB: shuffled[1].text,
    optionC: shuffled[2].text,
    optionD: shuffled[3].text,
    correctAnswer: newCorrectLetter,
    correctIndex: newCorrectIndex,
  };
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

// Get the fixed 50 questions for a training set
// Training set N has the same questions as Test N, in a fixed order
export function getTrainingSetQuestions(setNumber: number, state: string): Question[] {
  const allQuestions = questionsData as Question[];

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
export function getNextTrainingSetQuestion(
  setNumber: number,
  state: string,
  masteredIds: string[],
  wrongQueue: string[] = []
): Question | null {
  const questions = getTrainingSetQuestions(setNumber, state);

  // Find questions not yet mastered
  const unmasteredQuestions = questions.filter(q => !masteredIds.includes(q.questionId));

  if (unmasteredQuestions.length === 0) {
    return null;
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
  lastQuestionId: string | null = null
): Question | null {
  const allQuestions = questionsData as Question[];

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
