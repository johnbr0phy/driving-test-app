import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Question, TestSession, UserAnswer, TestAttemptStats } from '@/types';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface AppState {
  // Selected state
  selectedState: string | null;
  setSelectedState: (state: string) => void;

  // Current test sessions (supports multiple in-progress tests)
  currentTests: {
    [testId: number]: {
      questions: Question[];
      answers: { [key: number]: string };
      startedAt: Date | null;
    };
  };
  getCurrentTest: (testId: number) => { questions: Question[]; answers: { [key: number]: string }; startedAt: Date | null } | undefined;
  startTest: (testId: number, questions: Question[]) => void;
  setAnswer: (testId: number, questionIndex: number, answer: string) => void;
  clearCurrentTest: (testId: number) => void;

  // Completed tests (full history)
  completedTests: TestSession[];
  completeTest: (testId: number, score: number, questions: Question[], answers: { [key: number]: string }) => void;
  getTestSession: (testId: number) => TestSession | undefined;

  // Test attempt statistics (first/best scores)
  testAttempts: TestAttemptStats[];
  getTestAttemptStats: (testId: number) => TestAttemptStats | undefined;
  getTestAverageScore: (testId: number) => number;
  isTestUnlocked: (testId: number) => boolean;

  // Training mode
  training: {
    questionsAnswered: string[];
    correctCount: number;
    incorrectCount: number;
    currentStreak: number;
    bestStreak: number;
  };
  answerTrainingQuestion: (questionId: string, isCorrect: boolean) => void;
  resetTrainingSession: () => void;

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
  photoURL: string | null;
  setUserId: (userId: string | null) => void;
  setPhotoURL: (photoURL: string | null) => void;
  loadUserData: (userId: string) => Promise<void>;
  saveToFirestore: () => Promise<void>;
  resetAllData: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedState: null,
      currentTests: {},
      completedTests: [],
      testAttempts: [],
      training: {
        questionsAnswered: [],
        correctCount: 0,
        incorrectCount: 0,
        currentStreak: 0,
        bestStreak: 0,
      },
      userId: null,
      photoURL: null,

      // Actions
      setUserId: (userId: string | null) => {
        set({ userId });
      },

      setPhotoURL: (photoURL: string | null) => {
        set({ photoURL });
        get().saveToFirestore();
      },

      setSelectedState: (state: string) => {
        // Clear all current tests when switching states
        set({
          selectedState: state,
          currentTests: {},
        });
        // Save to Firestore
        get().saveToFirestore();
      },

      getCurrentTest: (testId: number) => {
        return get().currentTests[testId];
      },

      startTest: (testId: number, questions: Question[]) => {
        set((state) => ({
          currentTests: {
            ...state.currentTests,
            [testId]: {
              questions,
              answers: {},
              startedAt: new Date(),
            },
          },
        }));
        get().saveToFirestore();
      },

      setAnswer: (testId: number, questionIndex: number, answer: string) => {
        set((state) => ({
          currentTests: {
            ...state.currentTests,
            [testId]: {
              ...state.currentTests[testId],
              answers: {
                ...state.currentTests[testId]?.answers,
                [questionIndex]: answer,
              },
            },
          },
        }));
        get().saveToFirestore();
      },

      clearCurrentTest: (testId: number) => {
        set((state) => {
          const { [testId]: removed, ...remaining } = state.currentTests;
          return { currentTests: remaining };
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
          startedAt: get().currentTests[testId]?.startedAt || new Date(),
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
        get().clearCurrentTest(testId);
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

      getTestAverageScore: (testId: number) => {
        const { completedTests, selectedState } = get();
        const testSessions = completedTests.filter(
          (t) => t.testNumber === testId && t.state === selectedState
        );

        if (testSessions.length === 0) return 0;

        const totalScore = testSessions.reduce((sum, session) => sum + (session.score || 0), 0);
        return Math.round(totalScore / testSessions.length);
      },

      isTestUnlocked: (testId: number) => {
        // Test 1 is always unlocked
        if (testId === 1) return true;

        const { testAttempts, selectedState } = get();

        // For tests 2, 3, 4: check if all previous tests have bestScore >= 40
        for (let i = 1; i < testId; i++) {
          const attemptStats = testAttempts.find(
            (a) => a.testNumber === i && a.state === selectedState
          );
          // If previous test not completed or score < 40, this test is locked
          if (!attemptStats || attemptStats.bestScore < 40) {
            return false;
          }
        }

        return true;
      },

      // Training mode functions
      answerTrainingQuestion: (questionId: string, isCorrect: boolean) => {
        set((state) => {
          const newStreak = isCorrect ? state.training.currentStreak + 1 : 0;
          return {
            training: {
              ...state.training,
              questionsAnswered: [...state.training.questionsAnswered, questionId],
              correctCount: state.training.correctCount + (isCorrect ? 1 : 0),
              incorrectCount: state.training.incorrectCount + (isCorrect ? 0 : 1),
              currentStreak: newStreak,
              bestStreak: Math.max(state.training.bestStreak, newStreak),
            },
          };
        });
        get().saveToFirestore();
      },

      resetTrainingSession: () => {
        set((state) => ({
          training: {
            ...state.training,
            questionsAnswered: [],
            correctCount: 0,
            incorrectCount: 0,
            currentStreak: 0,
            // Keep bestStreak
          },
        }));
        get().saveToFirestore();
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
              currentTests: data.currentTests || {},
              completedTests: data.completedTests || [],
              testAttempts: data.testAttempts || [],
              training: data.training || {
                questionsAnswered: [],
                correctCount: 0,
                incorrectCount: 0,
                currentStreak: 0,
                bestStreak: 0,
              },
              photoURL: data.photoURL || null,
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
        const { userId, selectedState, currentTests, completedTests, testAttempts, training, photoURL } = get();
        if (!userId) return; // Don't save if no user is logged in

        try {
          // Convert currentTests dates to timestamps for Firestore
          const currentTestsForFirestore = Object.keys(currentTests).reduce((acc, testId) => {
            const test = currentTests[parseInt(testId)];
            acc[testId] = {
              ...test,
              startedAt: test.startedAt instanceof Date ? test.startedAt.toISOString() : test.startedAt,
            };
            return acc;
          }, {} as any);

          await setDoc(doc(db, 'users', userId), {
            selectedState,
            photoURL,
            currentTests: currentTestsForFirestore,
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
            training,
            lastUpdated: new Date().toISOString(),
          });
        } catch (error) {
          console.error('Error saving to Firestore:', error);
        }
      },

      resetAllData: () => {
        set({
          currentTests: {},
          completedTests: [],
          testAttempts: [],
          training: {
            questionsAnswered: [],
            correctCount: 0,
            incorrectCount: 0,
            currentStreak: 0,
            bestStreak: 0,
          },
        });
        get().saveToFirestore();
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
