import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Question, TestSession, UserAnswer } from '@/types';
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

        set((state) => ({
          completedTests: [
            // Remove previous attempt of THIS test in THIS state only
            ...state.completedTests.filter(
              (t) => !(t.testNumber === testId && t.state === currentState)
            ),
            session,
          ],
        }));

        // Clear current test
        get().clearCurrentTest();
        get().saveToFirestore();
      },

      getTestSession: (testId: number) => {
        const { completedTests, selectedState } = get();
        // Find test session for the current state
        return completedTests.find(
          (t) => t.testNumber === testId && t.state === selectedState
        );
      },

      getProgress: () => {
        const { completedTests, selectedState } = get();
        // Filter tests by current state only
        const stateTests = completedTests.filter((t) => t.state === selectedState);
        const testsCompleted = stateTests.length;

        if (testsCompleted === 0) {
          return {
            testsCompleted: 0,
            questionsAnswered: 0,
            totalCorrect: 0,
            accuracy: 0,
            averageScore: 0,
          };
        }

        const totalCorrect = stateTests.reduce((sum, test) => sum + (test.score || 0), 0);
        const questionsAnswered = stateTests.reduce((sum, test) => sum + test.totalQuestions, 0);
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
        const { userId, selectedState, currentTest, completedTests } = get();
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
