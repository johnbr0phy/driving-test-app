import { Question } from "@/types";

// Answer-option shuffling, kept out of lib/testGenerator.ts so registry exam
// pages can use it without bundling the DMV question banks.

// Helper to shuffle array
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Check if a question has position-dependent answers (e.g., "A and B", "Both B and C")
// These questions should not have their answers randomized
function hasPositionDependentAnswers(question: Question): boolean {
  const options = [question.optionA, question.optionB, question.optionC, question.optionD];

  // Pattern to detect references to other answer options (English, Spanish,
  // Vietnamese, Korean, Chinese).
  // Matches: "A and B", "B and C", "Both A and B", "A, B, and C", "A y B", "Tanto A como B",
  // "Todas las anteriores", "Cả A và B", "Tất cả các câu trên", "A와 B", etc.
  // Korean has no space before the particle ("A와 B"), so that branch uses \s*
  // rather than the \s+ the Latin-script branches rely on. Chinese is the same
  // ("A和B都对"), and its "of the above" options start with 以上 ("以上都对"),
  // which never starts a plain answer ("18岁及以上" ends with it).
  const positionReferencePattern = /\b(A|B|C|D)\s+(and|or|y|o|và|hoặc|,)\s+(A|B|C|D)\b|\bBoth\s+(A|B|C|D)\s+and\s+(A|B|C|D)\b|\bTanto\s+(A|B|C|D)\s+como\s+(A|B|C|D)\b|\bAll of the above\b|\bNone of the above\b|\bTodas las anteriores\b|\bNinguna de las anteriores\b|Tất cả các câu trên|Không câu nào đúng|(A|B|C|D)\s*(와|과|및)\s*(A|B|C|D)|위의 모든 것|위의 어느 것도 아님|위 항목 모두|정답 없음|(A|B|C|D)\s*(和|与|或|及|、)\s*(A|B|C|D)|^以上/i;

  return options.some(option => positionReferencePattern.test(option));
}

// Shuffle the answer options for a question (returns new question with shuffled options)
// Skips shuffling for questions with position-dependent answers
export function shuffleQuestionOptions(question: Question): Question {
  // Don't shuffle if any option references other options by letter
  if (hasPositionDependentAnswers(question)) {
    return question;
  }

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
