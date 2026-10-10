"use client";

import { useStore } from "@/store/useStore";
import { useV2Store } from "@/store/useV2Store";
import { useHydration } from "@/hooks/useHydration";
import { getExamById, examSetId } from "@/lib/exams";

/**
 * Returns a check for which catalog tests this browser or account has
 * started, for lists that cover every test at once (the settings page, the
 * header test switcher). Each registry exam keeps its own ID range and pseudo
 * state code in the store (see CLAUDE.md, Additional Exams); v2 exams (SAT,
 * ACT) keep their progress in their own store.
 */
export function useStartedTests(): (testId: string) => boolean {
  const hydrated = useHydration();
  const selectedState = useStore((s) => s.selectedState);
  const trainingSets = useStore((s) => s.trainingSets);
  const currentTests = useStore((s) => s.currentTests);
  const completedTests = useStore((s) => s.completedTests);
  const startedExams = useStore((s) => s.startedExams);
  const v2 = useV2Store();

  const idsInRange = (lo: number, hi: number) =>
    [...Object.keys(trainingSets), ...Object.keys(currentTests)].some((k) => {
      const n = Number(k);
      return n >= lo && n <= hi;
    });
  const v2Started = (examId: string) =>
    v2.results.some((r) => r.examId === examId) ||
    Object.values(v2.sessions).some((s) => s.examId === examId) ||
    Object.entries(v2.drills).some(([k, d]) => k.startsWith(`${examId}:`) && d.seen > 0);

  return (testId: string): boolean => {
    if (!hydrated) return false;
    if (testId === "dmv") return !!selectedState;
    if (startedExams.includes(testId) || v2Started(testId)) return true;
    const exam = getExamById(testId);
    if (!exam) return false;
    return (
      completedTests.some((t) => t.state === exam.stateCode) ||
      idsInRange(exam.idBase + 1, exam.idBase + exam.testCount) ||
      idsInRange(examSetId(exam, 1), examSetId(exam, exam.trainingSets.length))
    );
  };
}
