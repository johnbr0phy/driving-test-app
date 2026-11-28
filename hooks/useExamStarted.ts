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
type StudyState = ReturnType<typeof useStore.getState>;

export function hasStartedExam(state: StudyState, examId: string): boolean {
  if (examId === "dmv") return !!state.selectedState;
  if (state.startedExams.includes(examId)) return true;
  if (!getExamById(examId)) return false;
  const owns = (e: ReturnType<typeof getExamById>) => !!e && examFamilyId(e) === examId;
  return (
    Object.keys(state.currentTests).some((id) => owns(getExamForTestId(Number(id)))) ||
    state.testAttempts.some((a) => owns(getExamForTestId(a.testNumber))) ||
    Object.entries(state.trainingSets).some(
      ([id, set]) => owns(getExamForSetId(Number(id))) && set.masteredIds.length > 0
    )
  );
}

export function useExamStarted(examId: string): boolean {
  const hydrated = useHydration();
  const started = useStore((state) => hasStartedExam(state, examId));
  return hydrated && started;
}
