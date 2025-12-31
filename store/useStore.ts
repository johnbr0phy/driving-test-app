import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Question, TestSession, UserAnswer, TestAttemptStats } from '@/types';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Current data version - increment this when question data changes
const DATA_VERSION = 2;

interface AppState {
  // Data version notification
  showDataResetNotification: boolean;
  dismissDataResetNotification: () => void;

  // Guest mode
  isGuest: boolean;
  startGuestSession: () => void;

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

  // Training mode (for onboarding)
  training: {
    questionsAnswered: string[];
    correctCount: number;
    incorrectCount: number;
    currentStreak: number;
    bestStreak: number;
    totalCorrectAllTime: number;
    masteredQuestionIds: string[];
    lastQuestionId: string | null;
  };
  answerTrainingQuestion: (questionId: string, isCorrect: boolean) => void;
  resetTrainingSession: () => void;
  resetMasteredQuestions: () => void;

  // Training sets (post-onboarding)
  trainingSets: {
    [setId: number]: {
      masteredIds: string[];
      wrongQueue: string[];  // Questions answered wrong, to be asked later
    };
  };
  answerTrainingSetQuestion: (setId: number, questionId: string, isCorrect: boolean) => void;
  getTrainingSetProgress: (setId: number) => { correct: number; total: number; complete: boolean };
  resetTrainingSet: (setId: number) => void;

  // Onboarding
  isOnboardingComplete: () => boolean;

  // Progress stats
  getProgress: () => {
    testsCompleted: number;
    questionsAnswered: number;
    totalCorrect: number;
    accuracy: number;
    averageScore: number;
  };
  getPassProbability: () => number;

  // Firebase sync
  userId: string | null;
  photoURL: string | null;
  setUserId: (userId: string | null) => void;
  setPhotoURL: (photoURL: string | null) => void;
  loadUserData: (userId: string) => Promise<void>;
  checkUserHasData: (userId: string) => Promise<boolean>;
  saveToFirestore: () => Promise<void>;
  resetAllData: () => void;
  clearAllDataOnLogout: () => void;

  // Guest to user conversion
  convertGuestToUser: (userId: string) => Promise<void>;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Data version notification
      showDataResetNotification: false,
      dismissDataResetNotification: () => set({ showDataResetNotification: false }),

      // Initial state
      isGuest: false,
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
        totalCorrectAllTime: 0,
        masteredQuestionIds: [],
        lastQuestionId: null,
      },
      trainingSets: {},
      userId: null,
      photoURL: null,

      // Actions
      startGuestSession: () => {
        set({ isGuest: true });
      },

      setUserId: (userId: string | null) => {
        set({ userId });
      },

      setPhotoURL: (photoURL: string | null) => {
        set({ photoURL });
        get().saveToFirestore();
      },

      setSelectedState: (state: string) => {
        // Clear ALL data when switching states
        set({
          selectedState: state,
          currentTests: {},
          completedTests: [],
          testAttempts: [],
          training: {
            questionsAnswered: [],
            correctCount: 0,
            incorrectCount: 0,
            currentStreak: 0,
            bestStreak: 0,
            totalCorrectAllTime: 0,
            masteredQuestionIds: [],
            lastQuestionId: null,
          },
          trainingSets: {},
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
        // All tests (1, 2, 3, 4) require onboarding completion (10 correct training answers)
        // or prior app usage (backwards compatibility)
        return get().isOnboardingComplete();
      },

      // Training mode functions
      answerTrainingQuestion: (questionId: string, isCorrect: boolean) => {
        set((state) => {
          const newStreak = isCorrect ? state.training.currentStreak + 1 : 0;

          // Update mastered questions list
          let newMasteredIds = [...state.training.masteredQuestionIds];
          if (isCorrect) {
            // Add to mastered if not already there
            if (!newMasteredIds.includes(questionId)) {
              newMasteredIds.push(questionId);
            }
          } else {
            // Remove from mastered if answered wrong (they need to answer it correctly again)
            newMasteredIds = newMasteredIds.filter(id => id !== questionId);
          }

          return {
            training: {
              ...state.training,
              questionsAnswered: [...state.training.questionsAnswered, questionId],
              correctCount: state.training.correctCount + (isCorrect ? 1 : 0),
              incorrectCount: state.training.incorrectCount + (isCorrect ? 0 : 1),
              currentStreak: newStreak,
              bestStreak: Math.max(state.training.bestStreak, newStreak),
              totalCorrectAllTime: state.training.totalCorrectAllTime + (isCorrect ? 1 : 0),
              masteredQuestionIds: newMasteredIds,
              lastQuestionId: questionId,
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
            // Keep bestStreak, totalCorrectAllTime, masteredQuestionIds, lastQuestionId
          },
        }));
        get().saveToFirestore();
      },

      resetMasteredQuestions: () => {
        set((state) => ({
          training: {
            ...state.training,
            masteredQuestionIds: [],
            lastQuestionId: null,
          },
        }));
        get().saveToFirestore();
      },

      // Training sets functions
      answerTrainingSetQuestion: (setId: number, questionId: string, isCorrect: boolean) => {
        set((state) => {
          const currentSet = state.trainingSets[setId] || { masteredIds: [], wrongQueue: [] };
          let newMasteredIds = [...currentSet.masteredIds];
          let newWrongQueue = [...(currentSet.wrongQueue || [])];

          if (isCorrect) {
            // Add to mastered if not already there
            if (!newMasteredIds.includes(questionId)) {
              newMasteredIds.push(questionId);
            }
            // Remove from wrong queue
            newWrongQueue = newWrongQueue.filter(id => id !== questionId);
          } else {
            // Remove from mastered if answered wrong
            newMasteredIds = newMasteredIds.filter(id => id !== questionId);
            // Add to wrong queue (at the end) if not already there
            if (!newWrongQueue.includes(questionId)) {
              newWrongQueue.push(questionId);
            }
          }

          return {
            trainingSets: {
              ...state.trainingSets,
              [setId]: { masteredIds: newMasteredIds, wrongQueue: newWrongQueue },
            },
          };
        });
        get().saveToFirestore();
      },

      getTrainingSetProgress: (setId: number) => {
        const { trainingSets, training } = get();
        const setData = trainingSets[setId] || { masteredIds: [] };
        let correct = setData.masteredIds.length;
        const total = 50;

        // For set 1, include onboarding progress if no set-specific progress yet
        if (setId === 1 && correct === 0 && training.totalCorrectAllTime > 0) {
          correct = Math.min(50, training.totalCorrectAllTime);
        }

        return {
          correct,
          total,
          complete: correct >= total,
        };
      },

      resetTrainingSet: (setId: number) => {
        set((state) => ({
          trainingSets: {
            ...state.trainingSets,
            [setId]: { masteredIds: [], wrongQueue: [] },
          },
        }));
        get().saveToFirestore();
      },

      // Onboarding check - returns true if user has completed onboarding
      // (10+ correct training answers OR any existing app usage for backwards compatibility)
      isOnboardingComplete: () => {
        const { training, completedTests, testAttempts, selectedState } = get();

        // If user has 10+ correct training answers, onboarding is complete
        if (training.totalCorrectAllTime >= 10) {
          return true;
        }

        // Backwards compatibility: if user has any test history, they're onboarded
        const hasCompletedTests = completedTests.some((t) => t.state === selectedState);
        if (hasCompletedTests) {
          return true;
        }

        // Backwards compatibility: if user has any test attempt stats, they're onboarded
        const hasTestAttempts = testAttempts.some((a) => a.state === selectedState);
        if (hasTestAttempts) {
          return true;
        }

        return false;
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

      getPassProbability: () => {
        const { testAttempts, trainingSets, training, selectedState } = get();
        const stateAttempts = testAttempts.filter((a) => a.state === selectedState);

        // 8 components: 4 training sets + 4 practice tests
        // Each worth 12.5% (total = 100%)
        const WEIGHT_PER_COMPONENT = 12.5;
        let totalPassProbability = 0;

        // Training sets (4 × 12.5% = 50%)
        for (let setNum = 1; setNum <= 4; setNum++) {
          const setData = trainingSets[setNum];
          let masteredCount = setData?.masteredIds?.length || 0;

          // For set 1, include onboarding progress if no set-specific progress yet
          if (setNum === 1 && masteredCount === 0 && training.totalCorrectAllTime > 0) {
            masteredCount = Math.min(50, training.totalCorrectAllTime);
          }

          if (masteredCount > 0) {
            const setScore = (masteredCount / 50) * 100;
            totalPassProbability += setScore * (WEIGHT_PER_COMPONENT / 100);
          }
        }

        // Practice tests (4 × 12.5% = 50%)
        for (let testNum = 1; testNum <= 4; testNum++) {
          const attempt = stateAttempts.find(a => a.testNumber === testNum);
          if (attempt) {
            const testScore = (attempt.bestScore / 50) * 100;
            totalPassProbability += testScore * (WEIGHT_PER_COMPONENT / 100);
          }
        }

        return Math.round(totalPassProbability);
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
              training: {
                questionsAnswered: data.training?.questionsAnswered || [],
                correctCount: data.training?.correctCount || 0,
                incorrectCount: data.training?.incorrectCount || 0,
                currentStreak: data.training?.currentStreak || 0,
                bestStreak: data.training?.bestStreak || 0,
                totalCorrectAllTime: data.training?.totalCorrectAllTime || 0,
                masteredQuestionIds: data.training?.masteredQuestionIds || [],
                lastQuestionId: data.training?.lastQuestionId || null,
              },
              trainingSets: data.trainingSets || {},
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

      checkUserHasData: async (userId: string) => {
        try {
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            const data = userDoc.data();
            // Check if user has any meaningful progress data
            const hasCompletedTests = data.completedTests && data.completedTests.length > 0;
            const hasTestAttempts = data.testAttempts && data.testAttempts.length > 0;
            const hasTrainingProgress = data.training?.totalCorrectAllTime > 0;
            return hasCompletedTests || hasTestAttempts || hasTrainingProgress;
          }
          return false;
        } catch (error) {
          console.error('Error checking user data:', error);
          return false;
        }
      },

      saveToFirestore: async () => {
        const { userId, isGuest, selectedState, currentTests, completedTests, testAttempts, training, trainingSets, photoURL } = get();
        if (!userId || isGuest) return; // Don't save if no user is logged in or guest mode

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
            trainingSets,
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
            totalCorrectAllTime: 0,
            masteredQuestionIds: [],
            lastQuestionId: null,
          },
          trainingSets: {},
        });
        get().saveToFirestore();
      },

      clearAllDataOnLogout: () => {
        set({
          isGuest: false,
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
            totalCorrectAllTime: 0,
            masteredQuestionIds: [],
            lastQuestionId: null,
          },
          trainingSets: {},
          userId: null,
          photoURL: null,
        });
      },

      // Convert guest session to registered user
      convertGuestToUser: async (userId: string) => {
        // Set user ID and clear guest flag
        set({ userId, isGuest: false });
        // Save all existing guest progress to Firestore
        await get().saveToFirestore();
      },
    }),
    {
      name: 'driving-test-storage',
      version: DATA_VERSION,
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
      migrate: (persistedState: unknown, version: number) => {
        // If upgrading from an older version, reset all data and show notification
        if (version < DATA_VERSION) {
          console.log(`Migrating from version ${version} to ${DATA_VERSION} - resetting data`);
          return {
            showDataResetNotification: true,
            isGuest: false,
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
              totalCorrectAllTime: 0,
              masteredQuestionIds: [],
              lastQuestionId: null,
            },
            trainingSets: {},
            userId: null,
            photoURL: null,
          };
        }
        return persistedState as AppState;
      },
    }
  )
);
