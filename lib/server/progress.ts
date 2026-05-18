/*
 * Firestore user document shape — users/{uid}
 * Source of truth: store/useStore.ts → saveToFirestore() + loadUserData()
 * DATA_VERSION = 2 (field names must match exactly; web client reads/writes the same doc)
 *
 * All Date values are stored as ISO 8601 strings (toISOString()).
 * updateDoc is used for existing docs; setDoc with merge: true for first-time saves.
 * Server-owned fields are NOT written by saveToFirestore (they must not be overwritten here):
 *   unsubscribed, createdAt
 *
 * ─── Top-level fields ────────────────────────────────────────────────────────
 *
 *   selectedState:         string | null        // 2-letter state code (e.g. "CA") or null
 *   language:              "en" | "es"          // question language
 *   photoURL:              string | null
 *   emailConsent:          boolean
 *   lastUpdated:           string               // ISO timestamp of last client save
 *   subscription: {
 *     isPremium:           boolean
 *     purchasedAt:         string | null        // ISO timestamp
 *     stripeCustomerId:    string | null
 *     stripePaymentId:     string | null
 *   }
 *   activeDates:           string[]             // YYYY-MM-DD strings (local timezone, DAU tracking)
 *
 * ─── currentTests: { [testId: string]: CurrentTest } ─────────────────────────
 * Keys are numeric test IDs serialised as strings ("1", "2", "3", "4").
 *
 *   CurrentTest {
 *     questions:   Question[]                   // full Question objects (see types/index.ts)
 *     answers:     { [questionIndex: string]: string }  // index → "A"|"B"|"C"|"D"
 *     startedAt:   string                       // ISO timestamp (was Date in memory; converted on save)
 *   }
 *
 * ─── completedTests: TestSession[] ───────────────────────────────────────────
 *
 *   TestSession {
 *     id:              string                   // e.g. "test-1-1714000000000"
 *     testNumber:      number                   // 1-4 (DMV), 101-112 (CDL, out of scope v1)
 *     state:           string                   // 2-letter code or "CDL"
 *     questions:       Question[]
 *     answers:         UserAnswer[]
 *     startedAt:       string                   // ISO timestamp (converted from Date on save)
 *     completedAt:     string                   // ISO timestamp (converted from Date on save)
 *     score:           number                   // correct count (out of totalQuestions)
 *     totalQuestions:  number
 *   }
 *
 *   UserAnswer {
 *     questionId:   string
 *     userAnswer:   string                      // "A"|"B"|"C"|"D"
 *     isCorrect:    boolean
 *     answeredAt:   string                      // ISO timestamp (converted from Date on save)
 *     isFlagged?:   boolean
 *   }
 *
 * ─── testAttempts: TestAttemptStats[] ────────────────────────────────────────
 *
 *   TestAttemptStats {
 *     testNumber:      number
 *     state:           string
 *     attemptCount:    number
 *     firstScore:      number
 *     bestScore:       number
 *     lastAttemptDate: string                   // ISO timestamp (converted from Date on save)
 *   }
 *
 * ─── training: TrainingState ──────────────────────────────────────────────────
 * Legacy onboarding training mode (set 0). Written as a plain object, not ISO-converted.
 *
 *   {
 *     questionsAnswered:   string[]             // array of questionIds (not deduplicated)
 *     correctCount:        number
 *     incorrectCount:      number
 *     currentStreak:       number
 *     bestStreak:          number
 *     totalCorrectAllTime: number
 *     masteredQuestionIds: string[]
 *     lastQuestionId:      string | null
 *   }
 *
 * ─── trainingSets: { [setId: string]: TrainingSetState } ─────────────────────
 * Keys are set IDs as strings ("1", "2", "3", "4").
 *
 *   TrainingSetState {
 *     masteredIds: string[]                     // questionIds the user has mastered
 *     wrongQueue:  string[]                     // questionIds answered wrong, pending retry
 *   }
 *
 * ─── trainingAnswerHistory: TrainingAnswer[] ─────────────────────────────────
 *
 *   TrainingAnswer {
 *     questionId:  string
 *     isCorrect:   boolean
 *     answeredAt:  string                       // ISO timestamp (set at answer time)
 *   }
 *
 * ─── _stats (denormalised, admin-only) ───────────────────────────────────────
 * Written by saveToFirestore; not read back into the web app. Safe to write here too.
 *
 *   _stats: {
 *     trainingQuestionsAnswered: number
 *     testQuestionsAnswered:     number
 *     testsCompleted:            number
 *   }
 *
 * ─── Premium / unlock rules ──────────────────────────────────────────────────
 *   Tests 3-4 and Training Sets 3-4 require subscription.isPremium === true.
 *   Sets 1 and 2 are always free.
 *   CDL tests (101+) are out of scope for v1.
 *
 * ─── Daily question cap ───────────────────────────────────────────────────────
 *   500 questions/day per user. Tracked via dailyQuestionCounts field (added by this module):
 *
 *   dailyQuestionCounts: { [date: string]: number }  // date = YYYY-MM-DD (UTC)
 *
 *   Not written by the web client; safe to add without migration.
 */

import { getAdminDb } from '@/lib/firebase-admin';
import type { Question, TestSession, UserAnswer, Subscription } from '@/types';

// ─── Internal Firestore document types ───────────────────────────────────────

interface FirestoreTrainingSet {
  masteredIds: string[];
  wrongQueue: string[];
}

interface FirestoreTraining {
  questionsAnswered: string[];
  correctCount: number;
  incorrectCount: number;
  currentStreak: number;
  bestStreak: number;
  totalCorrectAllTime: number;
  masteredQuestionIds: string[];
  lastQuestionId: string | null;
}

interface FirestoreTestAttempt {
  testNumber: number;
  state: string;
  attemptCount: number;
  firstScore: number;
  bestScore: number;
  lastAttemptDate: string;
}

interface FirestoreCurrentTest {
  questions: Question[];
  answers: { [questionIndex: string]: string };
  startedAt: string;
}

interface FirestoreUserAnswer {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  answeredAt: string;
  isFlagged?: boolean;
}

interface FirestoreTestSession {
  id: string;
  testNumber: number;
  state: string;
  questions: Question[];
  answers: FirestoreUserAnswer[];
  startedAt: string;
  completedAt: string;
  score: number;
  totalQuestions: number;
}

interface FirestoreTrainingAnswerHistory {
  questionId: string;
  isCorrect: boolean;
  answeredAt: string;
}

interface FirestoreUserDoc {
  selectedState?: string | null;
  language?: 'en' | 'es';
  photoURL?: string | null;
  emailConsent?: boolean;
  lastUpdated?: string;
  subscription?: Subscription;
  activeDates?: string[];
  currentTests?: { [testId: string]: FirestoreCurrentTest };
  completedTests?: FirestoreTestSession[];
  testAttempts?: FirestoreTestAttempt[];
  training?: FirestoreTraining;
  trainingSets?: { [setId: string]: FirestoreTrainingSet };
  trainingAnswerHistory?: FirestoreTrainingAnswerHistory[];
  dailyQuestionCounts?: { [date: string]: number };
}

// ─── Public return types ──────────────────────────────────────────────────────

export interface UserInfo {
  selectedState: string | null;
  language: 'en' | 'es';
  subscription: Subscription;
}

export interface TrainingSetMastery {
  mastered: number;
  total: 50;
}

export interface ProgressInfo {
  completedTestCount: number;
  averageScore: number;
  accuracy: number;
  passProbability: number;
  trainingSetMastery: { [setId: number]: TrainingSetMastery };
}

export interface TestAttemptInfo {
  firstScore: number;
  bestScore: number;
  attemptCount: number;
  lastAttemptAt: string | null;
}

export interface TrainingSetProgressInfo {
  masteredCount: number;
  total: 50;
  wrongQueueLength: number;
  complete: boolean;
}

export interface QuestionPerformanceInfo {
  questionId: string;
  timesSeen: number;
  timesCorrect: number;
  accuracy: number;
}

export type MutatorResult<T> =
  | { ok: true; data: T }
  | { ok: false; code: string; message: string };

// ─── Internal helpers ─────────────────────────────────────────────────────────

async function fetchUserDoc(userId: string): Promise<FirestoreUserDoc | null> {
  const db = getAdminDb();
  const snap = await db.collection('users').doc(userId).get();
  if (!snap.exists) return null;
  return snap.data() as FirestoreUserDoc;
}

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

const DAILY_CAP = 500;
const TRAINING_SET_SIZE = 50;
const WEIGHT_PER_COMPONENT = 12.5;

// ─── Read-only functions ──────────────────────────────────────────────────────

export async function getUser(userId: string): Promise<UserInfo | null> {
  const data = await fetchUserDoc(userId);
  if (!data) return null;
  return {
    selectedState: data.selectedState ?? null,
    language: data.language ?? 'en',
    subscription: data.subscription ?? {
      isPremium: false,
      purchasedAt: null,
      stripeCustomerId: null,
      stripePaymentId: null,
    },
  };
}

export async function getProgress(userId: string): Promise<ProgressInfo | null> {
  const data = await fetchUserDoc(userId);
  if (!data) return null;

  const selectedState = data.selectedState ?? null;
  const completedTests = data.completedTests ?? [];
  const testAttempts = data.testAttempts ?? [];
  const trainingSets = data.trainingSets ?? {};
  const training = data.training;

  const stateTests = completedTests.filter((t) => t.state === selectedState);
  const stateAttempts = testAttempts.filter((a) => a.state === selectedState);

  const completedTestCount = stateAttempts.length;

  let averageScore = 0;
  let accuracy = 0;

  if (completedTestCount > 0) {
    const totalCorrect = stateTests.reduce((sum, t) => sum + (t.score ?? 0), 0);
    const questionsAnswered = stateTests.reduce((sum, t) => sum + t.totalQuestions, 0);
    accuracy = questionsAnswered > 0 ? Math.round((totalCorrect / questionsAnswered) * 100) : 0;
    averageScore = Math.round(
      (stateAttempts.reduce((sum, a) => sum + a.bestScore, 0) / stateAttempts.length) * 10
    ) / 10;
  }

  // Compute pass probability — mirrors useStore.getPassProbability exactly
  let totalPassProbability = 0;

  for (let setNum = 1; setNum <= 4; setNum++) {
    const setData = trainingSets[String(setNum)];
    let masteredCount = setData?.masteredIds?.length ?? 0;
    // Set 1 includes onboarding legacy progress
    if (setNum === 1 && masteredCount === 0 && (training?.totalCorrectAllTime ?? 0) > 0) {
      masteredCount = Math.min(TRAINING_SET_SIZE, training!.totalCorrectAllTime);
    }
    if (masteredCount > 0) {
      const setScore = (masteredCount / TRAINING_SET_SIZE) * 100;
      totalPassProbability += setScore * (WEIGHT_PER_COMPONENT / 100);
    }
  }

  for (let testNum = 1; testNum <= 4; testNum++) {
    const attempt = stateAttempts.find((a) => a.testNumber === testNum);
    if (attempt) {
      const testScore = (attempt.bestScore / TRAINING_SET_SIZE) * 100;
      totalPassProbability += testScore * (WEIGHT_PER_COMPONENT / 100);
    }
  }

  const trainingSetMastery: { [setId: number]: TrainingSetMastery } = {};
  for (let setNum = 1; setNum <= 4; setNum++) {
    const setData = trainingSets[String(setNum)];
    let mastered = setData?.masteredIds?.length ?? 0;
    if (setNum === 1 && mastered === 0 && (training?.totalCorrectAllTime ?? 0) > 0) {
      mastered = Math.min(TRAINING_SET_SIZE, training!.totalCorrectAllTime);
    }
    trainingSetMastery[setNum] = { mastered, total: TRAINING_SET_SIZE };
  }

  return {
    completedTestCount,
    averageScore,
    accuracy,
    passProbability: Math.round(totalPassProbability),
    trainingSetMastery,
  };
}

export async function getTestAttemptStats(
  userId: string,
  testId: 1 | 2 | 3 | 4
): Promise<TestAttemptInfo | null> {
  const data = await fetchUserDoc(userId);
  if (!data) return null;

  const selectedState = data.selectedState ?? null;
  const testAttempts = data.testAttempts ?? [];
  const attempt = testAttempts.find(
    (a) => a.testNumber === testId && a.state === selectedState
  );

  if (!attempt) {
    return { firstScore: 0, bestScore: 0, attemptCount: 0, lastAttemptAt: null };
  }

  return {
    firstScore: attempt.firstScore,
    bestScore: attempt.bestScore,
    attemptCount: attempt.attemptCount,
    lastAttemptAt: attempt.lastAttemptDate ?? null,
  };
}

export async function getTrainingSetProgress(
  userId: string,
  setId: 1 | 2 | 3 | 4
): Promise<TrainingSetProgressInfo | null> {
  const data = await fetchUserDoc(userId);
  if (!data) return null;

  const trainingSets = data.trainingSets ?? {};
  const training = data.training;
  const setData = trainingSets[String(setId)];

  let masteredCount = setData?.masteredIds?.length ?? 0;
  // Set 1 includes onboarding legacy progress — mirrors useStore.getTrainingSetProgress
  if (setId === 1 && masteredCount === 0 && (training?.totalCorrectAllTime ?? 0) > 0) {
    masteredCount = Math.min(TRAINING_SET_SIZE, training!.totalCorrectAllTime);
  }

  const wrongQueueLength = setData?.wrongQueue?.length ?? 0;

  return {
    masteredCount,
    total: TRAINING_SET_SIZE,
    wrongQueueLength,
    complete: masteredCount >= TRAINING_SET_SIZE,
  };
}

export async function getQuestionPerformance(
  userId: string
): Promise<QuestionPerformanceInfo[] | null> {
  const data = await fetchUserDoc(userId);
  if (!data) return null;

  const selectedState = data.selectedState ?? null;
  const completedTests = data.completedTests ?? [];
  const trainingAnswerHistory = data.trainingAnswerHistory ?? [];

  const performanceMap: { [questionId: string]: { correct: number; wrong: number } } = {};

  const stateTests = completedTests.filter((t) => t.state === selectedState);
  for (const test of stateTests) {
    for (const answer of test.answers) {
      if (!performanceMap[answer.questionId]) {
        performanceMap[answer.questionId] = { correct: 0, wrong: 0 };
      }
      if (answer.isCorrect) {
        performanceMap[answer.questionId].correct++;
      } else {
        performanceMap[answer.questionId].wrong++;
      }
    }
  }

  for (const answer of trainingAnswerHistory) {
    if (!performanceMap[answer.questionId]) {
      performanceMap[answer.questionId] = { correct: 0, wrong: 0 };
    }
    if (answer.isCorrect) {
      performanceMap[answer.questionId].correct++;
    } else {
      performanceMap[answer.questionId].wrong++;
    }
  }

  const result: QuestionPerformanceInfo[] = Object.entries(performanceMap).map(
    ([questionId, data]) => {
      const timesSeen = data.correct + data.wrong;
      return {
        questionId,
        timesSeen,
        timesCorrect: data.correct,
        accuracy: timesSeen > 0 ? Math.round((data.correct / timesSeen) * 100) : 0,
      };
    }
  );

  // Sort ascending by accuracy (weakest first)
  result.sort((a, b) => a.accuracy - b.accuracy);
  return result;
}

export async function getPassProbability(userId: string): Promise<number | null> {
  const progress = await getProgress(userId);
  if (!progress) return null;
  return progress.passProbability;
}

// ─── Daily cap helpers (used by write mutators) ───────────────────────────────

export async function checkDailyQuestionCap(
  userId: string
): Promise<MutatorResult<{ count: number; remaining: number }>> {
  const data = await fetchUserDoc(userId);
  if (!data) return { ok: false, code: 'USER_NOT_FOUND', message: 'User not found.' };

  const today = todayUtc();
  const counts = data.dailyQuestionCounts ?? {};
  const count = counts[today] ?? 0;

  if (count >= DAILY_CAP) {
    return {
      ok: false,
      code: 'RATE_LIMIT_DAILY',
      message: `Daily question limit of ${DAILY_CAP} reached. Resets at midnight UTC.`,
    };
  }

  return { ok: true, data: { count, remaining: DAILY_CAP - count } };
}

export async function incrementDailyQuestionCount(
  userId: string
): Promise<MutatorResult<{ count: number }>> {
  const db = getAdminDb();
  const userRef = db.collection('users').doc(userId);

  const result = await db.runTransaction(async (tx) => {
    const snap = await tx.get(userRef);
    if (!snap.exists) {
      return { ok: false as const, code: 'USER_NOT_FOUND', message: 'User not found.' };
    }

    const data = snap.data() as FirestoreUserDoc;
    const today = todayUtc();
    const counts = data.dailyQuestionCounts ?? {};
    const newCount = (counts[today] ?? 0) + 1;

    if (newCount > DAILY_CAP) {
      return {
        ok: false as const,
        code: 'RATE_LIMIT_DAILY',
        message: `Daily question limit of ${DAILY_CAP} reached. Resets at midnight UTC.`,
      };
    }

    tx.update(userRef, {
      [`dailyQuestionCounts.${today}`]: newCount,
      lastUpdated: new Date().toISOString(),
    });

    return { ok: true as const, data: { count: newCount } };
  });

  return result;
}

// ─── Write mutators ───────────────────────────────────────────────────────────

export async function setSelectedState(
  userId: string,
  stateCode: string
): Promise<MutatorResult<{ selectedState: string }>> {
  const db = getAdminDb();
  const userRef = db.collection('users').doc(userId);

  const snap = await userRef.get();
  const now = new Date().toISOString();

  const emptyTraining: FirestoreTraining = {
    questionsAnswered: [],
    correctCount: 0,
    incorrectCount: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalCorrectAllTime: 0,
    masteredQuestionIds: [],
    lastQuestionId: null,
  };

  const payload: Partial<FirestoreUserDoc> & { lastUpdated: string } = {
    selectedState: stateCode,
    currentTests: {},
    completedTests: [],
    testAttempts: [],
    training: emptyTraining,
    trainingSets: {},
    trainingAnswerHistory: [],
    lastUpdated: now,
  };

  if (!snap.exists) {
    await userRef.set(payload, { merge: true });
  } else {
    await userRef.update(payload);
  }

  return { ok: true, data: { selectedState: stateCode } };
}

export async function setLanguage(
  userId: string,
  lang: 'en' | 'es'
): Promise<MutatorResult<{ language: 'en' | 'es' }>> {
  const db = getAdminDb();
  const userRef = db.collection('users').doc(userId);

  const snap = await userRef.get();
  const now = new Date().toISOString();

  if (!snap.exists) {
    await userRef.set({ language: lang, lastUpdated: now }, { merge: true });
  } else {
    await userRef.update({ language: lang, lastUpdated: now });
  }

  return { ok: true, data: { language: lang } };
}

export async function startTest(
  userId: string,
  testId: 1 | 2 | 3 | 4,
  questions: Question[]
): Promise<MutatorResult<{ testId: number; questionCount: number }>> {
  const db = getAdminDb();
  const userRef = db.collection('users').doc(userId);

  const snap = await userRef.get();
  if (!snap.exists) return { ok: false, code: 'USER_NOT_FOUND', message: 'User not found.' };

  const data = snap.data() as FirestoreUserDoc;

  if (testId === 4 && !data.subscription?.isPremium) {
    return {
      ok: false,
      code: 'PREMIUM_REQUIRED',
      message: 'Practice test 4 requires a premium subscription.',
    };
  }

  // Idempotent: if a test session already exists, leave it intact
  if (data.currentTests?.[String(testId)]) {
    return { ok: true, data: { testId, questionCount: questions.length } };
  }

  const now = new Date().toISOString();
  await userRef.update({
    [`currentTests.${testId}`]: {
      questions,
      answers: {},
      startedAt: now,
    },
    lastUpdated: now,
  });

  return { ok: true, data: { testId, questionCount: questions.length } };
}

export async function setTestAnswer(
  userId: string,
  testId: 1 | 2 | 3 | 4,
  questionIndex: number,
  answer: string
): Promise<MutatorResult<{ testId: number; questionIndex: number }>> {
  // Enforce daily cap before recording
  const capResult = await incrementDailyQuestionCount(userId);
  if (!capResult.ok) return capResult;

  const db = getAdminDb();
  const userRef = db.collection('users').doc(userId);

  const snap = await userRef.get();
  if (!snap.exists) return { ok: false, code: 'USER_NOT_FOUND', message: 'User not found.' };

  const now = new Date().toISOString();
  await userRef.update({
    [`currentTests.${testId}.answers.${questionIndex}`]: answer,
    lastUpdated: now,
  });

  return { ok: true, data: { testId, questionIndex } };
}

export async function clearCurrentTest(
  userId: string,
  testId: 1 | 2 | 3 | 4
): Promise<MutatorResult<{ testId: number }>> {
  const db = getAdminDb();
  const userRef = db.collection('users').doc(userId);
  const { FieldValue } = await import('firebase-admin/firestore');

  const snap = await userRef.get();
  if (!snap.exists) return { ok: false, code: 'USER_NOT_FOUND', message: 'User not found.' };

  const now = new Date().toISOString();
  await userRef.update({
    [`currentTests.${testId}`]: FieldValue.delete(),
    lastUpdated: now,
  });

  return { ok: true, data: { testId } };
}

export async function completeTest(
  userId: string,
  testId: 1 | 2 | 3 | 4,
  score: number,
  questions: Question[],
  answers: { [key: number]: string }
): Promise<MutatorResult<{ sessionId: string; score: number }>> {
  const db = getAdminDb();
  const userRef = db.collection('users').doc(userId);
  const { FieldValue } = await import('firebase-admin/firestore');

  const result = await db.runTransaction(async (tx) => {
    const snap = await tx.get(userRef);
    if (!snap.exists) {
      return { ok: false as const, code: 'USER_NOT_FOUND', message: 'User not found.' };
    }

    const data = snap.data() as FirestoreUserDoc;

    if (testId === 4 && !data.subscription?.isPremium) {
      return {
        ok: false as const,
        code: 'PREMIUM_REQUIRED',
        message: 'Practice test 4 requires a premium subscription.',
      };
    }

    const selectedState = data.selectedState ?? 'CA';
    const now = new Date().toISOString();
    const currentTest = data.currentTests?.[String(testId)];

    const userAnswers: FirestoreUserAnswer[] = questions.map((q, index) => ({
      questionId: q.questionId,
      userAnswer: answers[index] ?? '',
      isCorrect: answers[index] === q.correctAnswer,
      answeredAt: now,
    }));

    const sessionId = `test-${testId}-${Date.now()}`;
    const session: FirestoreTestSession = {
      id: sessionId,
      testNumber: testId,
      state: selectedState,
      questions,
      answers: userAnswers,
      startedAt: currentTest?.startedAt ?? now,
      completedAt: now,
      score,
      totalQuestions: questions.length,
    };

    const completedTests = [...(data.completedTests ?? []), session];

    const existingAttempt = (data.testAttempts ?? []).find(
      (a) => a.testNumber === testId && a.state === selectedState
    );

    const updatedTestAttempts: FirestoreTestAttempt[] = existingAttempt
      ? (data.testAttempts ?? []).map((a) =>
          a.testNumber === testId && a.state === selectedState
            ? {
                ...a,
                attemptCount: a.attemptCount + 1,
                bestScore: Math.max(a.bestScore, score),
                lastAttemptDate: now,
              }
            : a
        )
      : [
          ...(data.testAttempts ?? []),
          {
            testNumber: testId,
            state: selectedState,
            attemptCount: 1,
            firstScore: score,
            bestScore: score,
            lastAttemptDate: now,
          },
        ];

    tx.update(userRef, {
      completedTests,
      testAttempts: updatedTestAttempts,
      [`currentTests.${testId}`]: FieldValue.delete(),
      lastUpdated: now,
    });

    return { ok: true as const, data: { sessionId, score } };
  });

  return result;
}

export async function answerTrainingSetQuestion(
  userId: string,
  setId: 1 | 2 | 3 | 4,
  questionId: string,
  isCorrect: boolean
): Promise<MutatorResult<{ masteredCount: number; wrongQueueLength: number; complete: boolean }>> {
  // Enforce daily cap before recording
  const capResult = await incrementDailyQuestionCount(userId);
  if (!capResult.ok) return capResult;

  const db = getAdminDb();
  const userRef = db.collection('users').doc(userId);

  const result = await db.runTransaction(async (tx) => {
    const snap = await tx.get(userRef);
    if (!snap.exists) {
      return { ok: false as const, code: 'USER_NOT_FOUND', message: 'User not found.' };
    }

    const data = snap.data() as FirestoreUserDoc;

    if (setId === 4 && !data.subscription?.isPremium) {
      return {
        ok: false as const,
        code: 'PREMIUM_REQUIRED',
        message: 'Training set 4 requires a premium subscription.',
      };
    }

    const currentSet = data.trainingSets?.[String(setId)] ?? { masteredIds: [], wrongQueue: [] };
    let newMasteredIds = [...currentSet.masteredIds];
    let newWrongQueue = [...(currentSet.wrongQueue ?? [])];

    if (isCorrect) {
      if (!newMasteredIds.includes(questionId)) {
        newMasteredIds.push(questionId);
      }
      newWrongQueue = newWrongQueue.filter((id) => id !== questionId);
    } else {
      newMasteredIds = newMasteredIds.filter((id) => id !== questionId);
      if (!newWrongQueue.includes(questionId)) {
        newWrongQueue.push(questionId);
      }
    }

    const now = new Date().toISOString();
    const historyEntry: FirestoreTrainingAnswerHistory = { questionId, isCorrect, answeredAt: now };

    tx.update(userRef, {
      [`trainingSets.${setId}`]: { masteredIds: newMasteredIds, wrongQueue: newWrongQueue },
      trainingAnswerHistory: [...(data.trainingAnswerHistory ?? []), historyEntry],
      lastUpdated: now,
    });

    return {
      ok: true as const,
      data: {
        masteredCount: newMasteredIds.length,
        wrongQueueLength: newWrongQueue.length,
        complete: newMasteredIds.length >= TRAINING_SET_SIZE,
      },
    };
  });

  return result;
}

export async function resetTrainingSet(
  userId: string,
  setId: 1 | 2 | 3 | 4
): Promise<MutatorResult<{ setId: number }>> {
  const db = getAdminDb();
  const userRef = db.collection('users').doc(userId);

  const snap = await userRef.get();
  if (!snap.exists) return { ok: false, code: 'USER_NOT_FOUND', message: 'User not found.' };

  const now = new Date().toISOString();
  await userRef.update({
    [`trainingSets.${setId}`]: { masteredIds: [], wrongQueue: [] },
    lastUpdated: now,
  });

  return { ok: true, data: { setId } };
}

export async function getTrainingSetData(
  userId: string,
  setId: 1 | 2 | 3 | 4
): Promise<{ masteredIds: string[]; wrongQueue: string[] } | null> {
  const data = await fetchUserDoc(userId);
  if (!data) return null;
  const setData = data.trainingSets?.[String(setId)];
  return {
    masteredIds: setData?.masteredIds ?? [],
    wrongQueue: setData?.wrongQueue ?? [],
  };
}

export interface CurrentTestSnapshot {
  questions: Question[];
  answers: { [questionIndex: string]: string };
  startedAt: string;
}

export async function getCurrentTest(
  userId: string,
  testId: 1 | 2 | 3 | 4
): Promise<CurrentTestSnapshot | null> {
  const data = await fetchUserDoc(userId);
  if (!data) return null;
  return (data.currentTests?.[String(testId)] as CurrentTestSnapshot) ?? null;
}

export interface CompletedTestSession {
  id: string;
  testNumber: number;
  state: string;
  questions: Question[];
  answers: { questionId: string; userAnswer: string; isCorrect: boolean; answeredAt: string }[];
  startedAt: string;
  completedAt: string;
  score: number;
  totalQuestions: number;
}

export async function getRecentTestSession(
  userId: string,
  testId: 1 | 2 | 3 | 4
): Promise<CompletedTestSession | null> {
  const data = await fetchUserDoc(userId);
  if (!data) return null;
  const sessions = (data.completedTests ?? []).filter((s) => s.testNumber === testId);
  if (sessions.length === 0) return null;
  return sessions[sessions.length - 1] as CompletedTestSession;
}
