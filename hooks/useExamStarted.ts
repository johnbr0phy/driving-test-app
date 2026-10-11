"use client";

import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { getExamById, getExamForSetId, getExamForTestId, examFamilyId } from "@/lib/exams";

/**
 * Whether this browser has started an exam: "dmv" once a state is picked in
 * onboarding, a registry exam once its dashboard was opened or it has any
 * progress (which also covers a signed-in account on a new device). Being a
 * guest is site-wide, so this is what keeps "Go to Dashboard" and "Sign up to
 * save" on the exams the person actually started.
 */
export function useExamStarted(examId: string): boolean {
  const hydrated = useHydration();
  const selectedState = useStore((state) => state.selectedState);
  const started = useStore((state) => state.startedExams.includes(examId));
  const hasProgress = useStore((state) => {
    if (examId === "dmv") return false;
    const exam = getExamById(examId);
    if (!exam) return false;
    const owns = (e: ReturnType<typeof getExamById>) => !!e && examFamilyId(e) === examId;
    return (
      Object.keys(state.currentTests).some((id) => owns(getExamForTestId(Number(id)))) ||
      state.testAttempts.some((a) => owns(getExamForTestId(a.testNumber))) ||
      Object.entries(state.trainingSets).some(
        ([id, set]) => owns(getExamForSetId(Number(id))) && set.masteredIds.length > 0
      )
    );
  });

  if (!hydrated) return false;
  if (examId === "dmv") return !!selectedState;
  return started || hasProgress;
}
