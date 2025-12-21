import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question, TestSession, UserAnswer } from '@/types';

interface AppState {
  // Selected state
  selectedState: string | null;
  setSelectedState: (state: string) => void;

  // Current test session
  currentTest: {
    testId: number | null;
    questions: Question[];
    answers: { [key: number]: string };
    startedAt: Date | null;
  };
  startTest: (testId: number, questions: Question[]) => void;
  setAnswer: (questionIndex: number, answer: string) => void;
  clearCurrentTest: () => void;

  // Completed tests
  completedTests: TestSession[];
  completeTest: (testId: number, score: number, questions: Question[], answers: { [key: number]: string }) => void;
  getTestSession: (testId: number) => TestSession | undefined;

  // Progress stats
  getProgress: () => {
    testsCompleted: number;
    questionsAnswered: number;
    totalCorrect: number;
    accuracy: number;
    averageScore: number;
  };
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedState: null,
      currentTest: {
        testId: null,
        questions: [],
        answers: {},
        startedAt: null,
      },
      completedTests: [],

      // Actions
      setSelectedState: (state: string) => set({ selectedState: state }),

      startTest: (testId: number, questions: Question[]) => {
        set({
          currentTest: {
            testId,
            questions,
            answers: {},
            startedAt: new Date(),
          },
        });
      },

      setAnswer: (questionIndex: number, answer: string) => {
        set((state) => ({
          currentTest: {
            ...state.currentTest,
            answers: {
              ...state.currentTest.answers,
              [questionIndex]: answer,
            },
          },
        }));
      },

      clearCurrentTest: () => {
        set({
          currentTest: {
            testId: null,
            questions: [],
            answers: {},
            startedAt: null,
          },
        });
      },

      completeTest: (testId: number, score: number, questions: Question[], answers: { [key: number]: string }) => {
        const userAnswers: UserAnswer[] = questions.map((q, index) => ({
          questionId: q.questionId,
          userAnswer: answers[index] || '',
          isCorrect: answers[index] === q.correctAnswer,
          answeredAt: new Date(),
        }));

        const session: TestSession = {
          id: `test-${testId}-${Date.now()}`,
          testNumber: testId,
          state: get().selectedState || 'CA',
          questions,
          answers: userAnswers,
          startedAt: get().currentTest.startedAt || new Date(),
          completedAt: new Date(),
          score,
          totalQuestions: questions.length,
        };

        set((state) => ({
          completedTests: [
            ...state.completedTests.filter((t) => t.testNumber !== testId),
            session,
          ],
        }));

        // Clear current test
        get().clearCurrentTest();
      },

      getTestSession: (testId: number) => {
        return get().completedTests.find((t) => t.testNumber === testId);
      },

      getProgress: () => {
        const { completedTests } = get();
        const testsCompleted = completedTests.length;

        if (testsCompleted === 0) {
          return {
            testsCompleted: 0,
            questionsAnswered: 0,
            totalCorrect: 0,
            accuracy: 0,
            averageScore: 0,
          };
        }

        const totalCorrect = completedTests.reduce((sum, test) => sum + (test.score || 0), 0);
        const questionsAnswered = completedTests.reduce((sum, test) => sum + test.totalQuestions, 0);
        const accuracy = questionsAnswered > 0 ? (totalCorrect / questionsAnswered) * 100 : 0;
        const averageScore = testsCompleted > 0 ? totalCorrect / testsCompleted : 0;

        return {
          testsCompleted,
          questionsAnswered,
          totalCorrect,
          accuracy: Math.round(accuracy),
          averageScore: Math.round(averageScore * 10) / 10,
        };
      },
    }),
    {
      name: 'driving-test-storage',
    }
  )
);
