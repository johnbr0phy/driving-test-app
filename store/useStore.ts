import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Question, TestSession, UserAnswer, TestAttemptStats } from '@/types';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

  // Completed tests (full history)
  completedTests: TestSession[];
  completeTest: (testId: number, score: number, questions: Question[], answers: { [key: number]: string }) => void;
  getTestSession: (testId: number) => TestSession | undefined;

  // Test attempt statistics (first/best scores)
  testAttempts: TestAttemptStats[];
  getTestAttemptStats: (testId: number) => TestAttemptStats | undefined;

  // Progress stats
  getProgress: () => {
    testsCompleted: number;
    questionsAnswered: number;
    totalCorrect: number;
    accuracy: number;
    averageScore: number;
  };

  // Firebase sync
  userId: string | null;
  setUserId: (userId: string | null) => void;
  loadUserData: (userId: string) => Promise<void>;
  saveToFirestore: () => Promise<void>;
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
      testAttempts: [],
      userId: null,

      // Actions
      setUserId: (userId: string | null) => {
        set({ userId });
      },

      setSelectedState: (state: string) => {
        // Clear current test when switching states
        set({
          selectedState: state,
          currentTest: {
            testId: null,
            questions: [],
            answers: {},
            startedAt: null,
          },
        });
        // Save to Firestore
        get().saveToFirestore();
      },

      startTest: (testId: number, questions: Question[]) => {
        set({
          currentTest: {
            testId,
            questions,
            answers: {},
            startedAt: new Date(),
          },
        });
        get().saveToFirestore();
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
        get().saveToFirestore();
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
        get().saveToFirestore();
      },

      completeTest: (testId: number, score: number, questions: Question[], answers: { [key: number]: string }) => {
        const currentState = get().selectedState || 'CA';
        const userAnswers: UserAnswer[] = questions.map((q, index) => ({
          questionId: q.questionId,
          userAnswer: answers[index] || '',
          isCorrect: answers[index] === q.correctAnswer,
          answeredAt: new Date(),
        }));

        const session: TestSession = {
          id: `test-${testId}-${Date.now()}`,
          testNumber: testId,
          state: currentState,
          questions,
          answers: userAnswers,
          startedAt: get().currentTest.startedAt || new Date(),
          completedAt: new Date(),
          score,
          totalQuestions: questions.length,
        };

        // Update testAttempts stats
        const existingAttempt = get().testAttempts.find(
          (a) => a.testNumber === testId && a.state === currentState
        );

        const updatedTestAttempts = existingAttempt
          ? // Update existing attempt
            get().testAttempts.map((a) =>
              a.testNumber === testId && a.state === currentState
                ? {
                    ...a,
                    attemptCount: a.attemptCount + 1,
                    bestScore: Math.max(a.bestScore, score),
                    lastAttemptDate: new Date(),
                  }
                : a
            )
          : // Create new attempt entry
            [
              ...get().testAttempts,
              {
                testNumber: testId,
                state: currentState,
                attemptCount: 1,
                firstScore: score,
                bestScore: score,
                lastAttemptDate: new Date(),
              },
            ];

        set((state) => ({
          completedTests: [...state.completedTests, session],
          testAttempts: updatedTestAttempts,
        }));

        // Clear current test
        get().clearCurrentTest();
        get().saveToFirestore();
      },

      getTestSession: (testId: number) => {
        const { completedTests, selectedState } = get();
        // Find most recent test session for the current state
        const sessions = completedTests.filter(
          (t) => t.testNumber === testId && t.state === selectedState
        );
        // Return the most recent session
        return sessions.length > 0 ? sessions[sessions.length - 1] : undefined;
      },

      getTestAttemptStats: (testId: number) => {
        const { testAttempts, selectedState } = get();
        return testAttempts.find(
          (a) => a.testNumber === testId && a.state === selectedState
        );
      },

      getProgress: () => {
        const { completedTests, testAttempts, selectedState } = get();
        // Filter tests and attempts by current state only
        const stateTests = completedTests.filter((t) => t.state === selectedState);
        const stateAttempts = testAttempts.filter((a) => a.state === selectedState);

        // Count unique tests completed (not total attempts)
        const testsCompleted = stateAttempts.length;

        if (testsCompleted === 0) {
          return {
            testsCompleted: 0,
            questionsAnswered: 0,
            totalCorrect: 0,
            accuracy: 0,
            averageScore: 0,
          };
        }

        // Count all attempts for questions answered and accuracy
        const totalCorrect = stateTests.reduce((sum, test) => sum + (test.score || 0), 0);
        const questionsAnswered = stateTests.reduce((sum, test) => sum + test.totalQuestions, 0);
        const accuracy = questionsAnswered > 0 ? (totalCorrect / questionsAnswered) * 100 : 0;

        // Average best score across unique tests
        const averageBestScore = stateAttempts.length > 0
          ? stateAttempts.reduce((sum, a) => sum + a.bestScore, 0) / stateAttempts.length
          : 0;

        return {
          testsCompleted,
          questionsAnswered,
          totalCorrect,
          accuracy: Math.round(accuracy),
          averageScore: Math.round(averageBestScore * 10) / 10,
        };
      },

      // Firebase sync functions
      loadUserData: async (userId: string) => {
        try {
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            const data = userDoc.data();
            set({
              selectedState: data.selectedState || null,
              currentTest: data.currentTest || {
                testId: null,
                questions: [],
                answers: {},
                startedAt: null,
              },
              completedTests: data.completedTests || [],
              testAttempts: data.testAttempts || [],
              userId,
            });
          } else {
            // New user - set userId
            set({ userId });
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      },

      saveToFirestore: async () => {
        const { userId, selectedState, currentTest, completedTests, testAttempts } = get();
        if (!userId) return; // Don't save if no user is logged in

        try {
          await setDoc(doc(db, 'users', userId), {
            selectedState,
            currentTest: {
              ...currentTest,
              // Convert Date to timestamp for Firestore
              startedAt: currentTest.startedAt?.toISOString() || null,
            },
            completedTests: completedTests.map(test => ({
              ...test,
              startedAt: test.startedAt instanceof Date ? test.startedAt.toISOString() : test.startedAt,
              completedAt: test.completedAt instanceof Date ? test.completedAt.toISOString() : test.completedAt,
              answers: test.answers.map(a => ({
                ...a,
                answeredAt: a.answeredAt instanceof Date ? a.answeredAt.toISOString() : a.answeredAt,
              })),
            })),
            testAttempts: testAttempts.map(attempt => ({
              ...attempt,
              lastAttemptDate: attempt.lastAttemptDate instanceof Date ? attempt.lastAttemptDate.toISOString() : attempt.lastAttemptDate,
            })),
            lastUpdated: new Date().toISOString(),
          });
        } catch (error) {
          console.error('Error saving to Firestore:', error);
        }
      },
    }),
    {
      name: 'driving-test-storage',
      storage: createJSONStorage(() => {
        // Only use localStorage on the client side
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        // Return a dummy storage for SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      skipHydration: false,
    }
  )
);
