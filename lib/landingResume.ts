// This device-only hint lets the hero show the dashboard link before the
// user's full saved progress and auth state hydrate. It contains exam IDs only.
import { examFamilyId, getExamById, getExamForSetId, getExamForTestId } from "@/lib/exams";
import type { useStore } from "@/store/useStore";

export const LANDING_RESUME_KEY = "tigertest-landing-resume";
export const LANDING_RESUME_SCRIPT = `
(function () {
  try {
    var marker = document.currentScript;
    var exam = marker.dataset.exam;
    if (!exam) return;
    var ids = JSON.parse(localStorage.getItem("${LANDING_RESUME_KEY}") || "null");
    if (Array.isArray(ids) && ids.includes(exam)) marker.setAttribute("data-resume", "");
  } catch (e) {}
})();`;

type StudyState = ReturnType<typeof useStore.getState>;

export function syncLandingResume(state: StudyState, previous?: StudyState) {
  // The dashboard and try question mark their exam started. A changed account
  // or a Firestore load can also replace the list, including with older data.
  if (previous && state.startedExams === previous.startedExams &&
      state.userId === previous.userId && state.isGuest === previous.isGuest &&
      state.loadedUid === previous.loadedUid) return;
  try {
    const ids = new Set<string>();
    if (state.isGuest || state.userId) {
      for (const id of state.startedExams) {
        const exam = getExamById(id);
        if (exam) ids.add(examFamilyId(exam));
      }
      // Old accounts may have saved work that predates the startedExams list.
      const add = (e: ReturnType<typeof getExamForTestId>) => { if (e) ids.add(examFamilyId(e)); };
      for (const id of Object.keys(state.currentTests)) add(getExamForTestId(Number(id)));
      for (const attempt of state.testAttempts) add(getExamForTestId(attempt.testNumber));
      for (const [id, set] of Object.entries(state.trainingSets)) {
        if (set.masteredIds.length) add(getExamForSetId(Number(id)));
      }
    }
    if (ids.size) localStorage.setItem(LANDING_RESUME_KEY, JSON.stringify([...ids]));
    else localStorage.removeItem(LANDING_RESUME_KEY);
  } catch {
    // Progress and the landing still work if storage is unavailable.
  }
}
