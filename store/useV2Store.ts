import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DrillState, TestResultV2, TestSessionV2 } from "@/lib/v2/types";
import { EMPTY_DRILL } from "@/lib/v2/training";

/**
 * v2 store: full-length sectioned tests and domain drills for the v2 exams.
 * Deliberately separate from useStore (DMV + registry exams). Persisted to
 * localStorage under its own key; Firestore sync is a later step and should
 * mirror this object under a `v2` field on the user document.
 */
interface V2State {
  sessions: Record<string, TestSessionV2>;
  results: TestResultV2[];
  drills: Record<string, DrillState>;
  goals: Record<string, number>;

  putSession: (session: TestSessionV2) => void;
  removeSession: (key: string) => void;
  addResult: (result: TestResultV2) => void;
  answerDrill: (key: string, questionId: string, correct: boolean) => void;
  resetDrill: (key: string) => void;
  setGoal: (examId: string, goal: number) => void;
}

export const useV2Store = create<V2State>()(
  persist(
    (set) => ({
      sessions: {},
      results: [],
      drills: {},
      goals: {},

      putSession: (session) => set((s) => ({ sessions: { ...s.sessions, [session.key]: session } })),
      removeSession: (key) =>
        set((s) => {
          const sessions = { ...s.sessions };
          delete sessions[key];
          return { sessions };
        }),
      addResult: (result) => set((s) => ({ results: [...s.results, result] })),

      answerDrill: (key, questionId, correct) =>
        set((s) => {
          const d = s.drills[key] ?? EMPTY_DRILL;
          const wrongQueue = d.wrongQueue.filter((id) => id !== questionId);
          const next: DrillState = correct
            ? { masteredIds: d.masteredIds.includes(questionId) ? d.masteredIds : [...d.masteredIds, questionId], wrongQueue, seen: d.seen + 1, correct: d.correct + 1 }
            : { masteredIds: d.masteredIds, wrongQueue: [...wrongQueue, questionId], seen: d.seen + 1, correct: d.correct };
          return { drills: { ...s.drills, [key]: next } };
        }),
      resetDrill: (key) => set((s) => ({ drills: { ...s.drills, [key]: EMPTY_DRILL } })),
      setGoal: (examId, goal) => set((s) => ({ goals: { ...s.goals, [examId]: goal } })),
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
