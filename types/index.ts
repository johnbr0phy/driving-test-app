// Question types
export type QuestionType = "Universal" | "State-Specific";

export type QuestionCategory =
  | "general"
  | "speedLimits"
  | "duiBac"
  | "gdlLicensing"
  | "insurance"
  | "seatbeltPhone"
  | "pointsPenalties"
  | "stateUnique";

export interface Question {
  type: QuestionType;
  state: string; // 2-letter code or "ALL"
  questionId: string;
  category: QuestionCategory;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string; // "A", "B", "C", or "D"
  correctIndex: number; // 0, 1, 2, or 3
  explanation: string;
}

// User answer types
export interface UserAnswer {
  questionId: string;
  userAnswer: string; // "A", "B", "C", or "D"
  isCorrect: boolean;
  answeredAt: Date;
  isFlagged?: boolean;
}

// Test session types
export interface TestSession {
  id: string;
  testNumber: number; // 1-4
  state: string; // 2-letter code
  questions: Question[];
  answers: UserAnswer[];
  startedAt: Date;
  completedAt?: Date;
  score?: number;
  totalQuestions: number;
}

// User progress types
export interface UserProgress {
  userId: string;
  state: string; // 2-letter code
  test1Completed: boolean;
  test2Completed: boolean;
  test3Completed: boolean;
  test4Completed: boolean;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  lastActivity: Date;
  completedSessions: TestSession[];
}

// Category stats for progress tracking
export interface CategoryStats {
  category: QuestionCategory;
  totalAnswered: number;
  correctAnswers: number;
  accuracy: number; // percentage
}

// Test attempt statistics
export interface TestAttemptStats {
  testNumber: number;
  state: string;
  attemptCount: number;
  firstScore: number; // Score on first attempt
  bestScore: number; // Highest score achieved
  lastAttemptDate: Date;
}

// State selection
export interface State {
  name: string;
  code: string; // 2-letter code
}
