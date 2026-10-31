import { queueAchievementCelebration } from "@/lib/achievementCelebration";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { withoutExamV2 } from "@/lib/v2/merge";
import { BasicsSkillState, DrillState, QuestionTally, TestResultV2, TestSessionV2 } from "@/lib/v2/types";
import { EMPTY_DRILL } from "@/lib/v2/training";
import { isAnswered } from "@/lib/v2/grading";
import { trackFunnelStep } from "@/lib/funnel";
import { trackQuestionsAnswered } from "@/lib/analytics";

/** Drill and Basics keys are `${examId}:${...}` (drillKey, basicsKey). */
const examOf = (key: string) => key.split(":")[0];

/**
 * v2 store: full-length sectioned tests and domain drills for the v2 exams.
 * Deliberately separate from useStore (DMV + registry exams). Persisted to
 * localStorage under its own key and mirrored to the `v2` field of the
 * signed-in user's Firestore document by lib/v2/sync.ts.
 */
interface V2State {
  sessions: Record<string, TestSessionV2>;
  results: TestResultV2[];
  drills: Record<string, DrillState>;
  /** Learned Basics skills, keyed by lib/v2/basics basicsKey(). */
  basics: Record<string, BasicsSkillState>;
  goals: Record<string, number>;
  /** Drill answers per question, by exam then question id (the stats page and Common Mistakes). */
  questionStats: Record<string, Record<string, QuestionTally>>;
  /** Account this local copy was last synced with (null = guest data). */
  syncedUid: string | null;

  putSession: (session: TestSessionV2) => void;
  removeSession: (key: string) => void;
  addResult: (result: TestResultV2) => void;
  /** base: the state to build on when the key has none yet (a carried-over drill). */
  answerDrill: (key: string, questionId: string, correct: boolean, base?: DrillState) => void;
  resetDrill: (key: string) => void;
  completeBasics: (key: string, state: Omit<BasicsSkillState, "done" | "completedAt">) => void;
  /** Delete one exam's sessions, results, drills and goal. */
  resetExam: (examId: string) => void;
  setGoal: (examId: string, goal: number) => void;
  /** Replace the synced data (sessions, results, drills, goals) wholesale. */
  replaceData: (data: V2Data, syncedUid: string | null) => void;
}

export type V2Data = Pick<V2State, "sessions" | "results" | "drills" | "basics" | "goals" | "questionStats">;
export const EMPTY_V2: V2Data = { sessions: {}, results: [], drills: {}, basics: {}, goals: {}, questionStats: {} };

export const useV2Store = create<V2State>()(
  persist(
    (set) => ({
      sessions: {},
      results: [],
      drills: {},
      basics: {},
      goals: {},
      questionStats: {},
      syncedUid: null,

      putSession: (session) => set((s) => ({ sessions: { ...s.sessions, [session.key]: session } })),
      removeSession: (key) =>
        set((s) => {
          const sessions = { ...s.sessions };
          delete sessions[key];
          return { sessions };
        }),
      addResult: (result) => {
        queueAchievementCelebration(`v2:${result.key}:${result.completedAt}`);
        trackFunnelStep("answered");
        trackQuestionsAnswered(result.items.filter((i) => isAnswered(i.answer)).length, result.examId);
        set((s) => ({ results: [...s.results, result] }));
      },

      answerDrill: (key, questionId, correct, base) => {
        trackQuestionsAnswered(1, examOf(key));
        set((s) => {
          const d = s.drills[key] ?? base ?? EMPTY_DRILL;
          const wrongQueue = d.wrongQueue.filter((id) => id !== questionId);
          const next: DrillState = correct
            ? { masteredIds: d.masteredIds.includes(questionId) ? d.masteredIds : [...d.masteredIds, questionId], wrongQueue, seen: d.seen + 1, correct: d.correct + 1 }
            : { masteredIds: d.masteredIds, wrongQueue: [...wrongQueue, questionId], seen: d.seen + 1, correct: d.correct };
          const examId = examOf(key);
          const forExam = s.questionStats?.[examId] ?? {};
          const tally = forExam[questionId] ?? { n: 0, w: 0 };
          const questionStats = { ...s.questionStats, [examId]: { ...forExam, [questionId]: { n: tally.n + 1, w: tally.w + (correct ? 0 : 1) } } };
          return { drills: { ...s.drills, [key]: next }, questionStats };
        });
      },
      resetDrill: (key) => set((s) => ({ drills: { ...s.drills, [key]: EMPTY_DRILL } })),
      completeBasics: (key, state) => {
        trackFunnelStep("answered");
        trackQuestionsAnswered(state.total, examOf(key));
        set((s) => ({ basics: { ...s.basics, [key]: { ...state, done: true, completedAt: new Date().toISOString() } } }));
      },
      resetExam: (examId) => set((s) => withoutExamV2(s, examId)),
      setGoal: (examId, goal) => set((s) => ({ goals: { ...s.goals, [examId]: goal } })),
      replaceData: (data, syncedUid) => set({ ...EMPTY_V2, ...data, syncedUid }),
    }),
    {
      name: "tigertest-v2",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

/** Latest result per test, newest first. */
export function resultsForExam(results: TestResultV2[], examId: string): TestResultV2[] {
  return results.filter((r) => r.examId === examId).sort((a, b) => b.completedAt.localeCompare(a.completedAt));
}
