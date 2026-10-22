import { create } from "zustand";
import { persist } from "zustand/middleware";

// Progress on quizzes (lib/quizzes.ts), per quiz code, kept apart from the
// DMV/registry store so a quiz never collides with an exam's set ids. Lives
// in localStorage under "tigertest-quizzes" and is mirrored to
// users/{uid}.quizProgress by components/quiz/QuizSync.tsx (lib/quizSync.ts),
// the way the v2 store is.

export interface QuizAnswerRecord {
  /** Engine question id ("<code>-q3"). */
  q: string;
  ok: boolean;
  /** ISO time. */
  t: string;
}

export interface QuizTestAttempt {
  /** ISO time, the attempt's id. */
  at: string;
  correct: number;
  total: number;
  /** Engine question ids answered wrong, for "practice what you missed". */
  missedIds: string[];
  /** The order and answers of the sitting, so the results page can show every question. */
  questionIds: string[];
  answers: Record<string, string>;
}

export interface QuizCodeProgress {
  /** Practice mode: mastered engine question ids and the wrong-answer queue. */
  masteredIds: string[];
  wrongQueue: string[];
  /** Every answer, newest last (capped). */
  answers: QuizAnswerRecord[];
  tests: QuizTestAttempt[];
  /** Flashcards marked "got it". */
  known: string[];
  /** A test in progress: questions in order and the answers so far. */
  current?: { startedAt: string; questionIds: string[]; answers: Record<string, string>; optionOrders: Record<string, string> };
  lastPlayedAt: string;
}

export interface RecentQuiz {
  code: string;
  title: string;
  ownerName: string;
  questionCount: number;
  at: string;
}

export interface QuizData {
  progress: Record<string, QuizCodeProgress>;
  /** Quizzes opened on this browser, newest first, for "Your recent quizzes". */
  recent: RecentQuiz[];
}

export const EMPTY_QUIZ_DATA: QuizData = { progress: {}, recent: [] };

export const EMPTY_CODE_PROGRESS: QuizCodeProgress = {
  masteredIds: [],
  wrongQueue: [],
  answers: [],
  tests: [],
  known: [],
  lastPlayedAt: "",
};

const MAX_ANSWERS = 600;
const MAX_TESTS = 30;
const MAX_RECENT = 50;

interface QuizStore extends QuizData {
  syncedUid: string | null;
  touchQuiz: (quiz: RecentQuiz) => void;
  answerPractice: (code: string, questionId: string, correct: boolean) => void;
  resetPractice: (code: string, onlyIds?: string[]) => void;
  setKnown: (code: string, questionId: string, known: boolean) => void;
  resetKnown: (code: string) => void;
  startTest: (code: string, questionIds: string[], optionOrders: Record<string, string>) => void;
  answerTest: (code: string, questionId: string, answer: string) => void;
  finishTest: (code: string, attempt: QuizTestAttempt) => void;
  abandonTest: (code: string) => void;
  forgetQuiz: (code: string) => void;
  replaceData: (data: QuizData, syncedUid: string | null) => void;
}

function withCode(state: QuizData, code: string, patch: (p: QuizCodeProgress) => QuizCodeProgress): Pick<QuizData, "progress"> {
  const current = state.progress[code] ?? EMPTY_CODE_PROGRESS;
  return { progress: { ...state.progress, [code]: { ...patch(current), lastPlayedAt: new Date().toISOString() } } };
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      ...EMPTY_QUIZ_DATA,
      syncedUid: null,

      touchQuiz: (quiz) =>
        set((state) => ({
          recent: [{ ...quiz, at: new Date().toISOString() }, ...state.recent.filter((r) => r.code !== quiz.code)].slice(0, MAX_RECENT),
        })),

      answerPractice: (code, questionId, correct) =>
        set((state) =>
          withCode(state, code, (p) => {
            let masteredIds = [...p.masteredIds];
            let wrongQueue = [...p.wrongQueue];
            if (correct) {
              if (!masteredIds.includes(questionId)) masteredIds.push(questionId);
              wrongQueue = wrongQueue.filter((id) => id !== questionId);
            } else {
              masteredIds = masteredIds.filter((id) => id !== questionId);
              if (!wrongQueue.includes(questionId)) wrongQueue.push(questionId);
            }
            return {
              ...p,
              masteredIds,
              wrongQueue,
              answers: [...p.answers, { q: questionId, ok: correct, t: new Date().toISOString() }].slice(-MAX_ANSWERS),
            };
          }),
        ),

      resetPractice: (code, onlyIds) =>
        set((state) =>
          withCode(state, code, (p) => {
            const keep = (id: string) => (onlyIds ? !onlyIds.includes(id) : false);
            return { ...p, masteredIds: p.masteredIds.filter(keep), wrongQueue: p.wrongQueue.filter(keep) };
          }),
        ),

      setKnown: (code, questionId, known) =>
        set((state) =>
          withCode(state, code, (p) => ({
            ...p,
            known: known ? (p.known.includes(questionId) ? p.known : [...p.known, questionId]) : p.known.filter((id) => id !== questionId),
          })),
        ),

      resetKnown: (code) => set((state) => withCode(state, code, (p) => ({ ...p, known: [] }))),

      startTest: (code, questionIds, optionOrders) =>
        set((state) =>
          withCode(state, code, (p) => ({ ...p, current: { startedAt: new Date().toISOString(), questionIds, answers: {}, optionOrders } })),
        ),

      answerTest: (code, questionId, answer) =>
        set((state) =>
          withCode(state, code, (p) =>
            p.current ? { ...p, current: { ...p.current, answers: { ...p.current.answers, [questionId]: answer } } } : p,
          ),
        ),

      finishTest: (code, attempt) =>
        set((state) =>
          withCode(state, code, (p) => {
            const { current: _current, ...rest } = p; // eslint-disable-line @typescript-eslint/no-unused-vars
            const answers = [
              ...p.answers,
              ...attempt.questionIds.map((q) => ({ q, ok: !attempt.missedIds.includes(q), t: attempt.at })),
            ].slice(-MAX_ANSWERS);
            return { ...rest, answers, tests: [...p.tests.filter((t) => t.at !== attempt.at), attempt].slice(-MAX_TESTS) };
          }),
        ),

      abandonTest: (code) =>
        set((state) =>
          withCode(state, code, (p) => {
            const { current: _current, ...rest } = p; // eslint-disable-line @typescript-eslint/no-unused-vars
            return rest;
          }),
        ),

      forgetQuiz: (code) =>
        set((state) => {
          const { [code]: _gone, ...progress } = state.progress; // eslint-disable-line @typescript-eslint/no-unused-vars
          return { progress, recent: state.recent.filter((r) => r.code !== code) };
        }),

      replaceData: (data, syncedUid) => set({ ...EMPTY_QUIZ_DATA, ...data, syncedUid }),
    }),
    {
      name: "tigertest-quizzes",
      partialize: (s) => ({ progress: s.progress, recent: s.recent, syncedUid: s.syncedUid }),
    },
  ),
);

/** Progress for one quiz, never undefined. */
export function codeProgress(state: Pick<QuizData, "progress">, code: string): QuizCodeProgress {
  return state.progress[code] ?? EMPTY_CODE_PROGRESS;
}
