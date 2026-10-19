"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { useHydration } from "@/hooks/useHydration";
import { getExamById, isExamQuestionId } from "@/lib/exams";
import { DMV_EXAM_ID } from "@/lib/classes";
import { recoverClassMisses } from "@/lib/classProgress";

// Renders nothing. On a v1 or DMV page, sends this browser's answer history
// for the exam to its classes once, to rebuild misses lost before the
// Oct 19 2026 fix (see recoverClassMisses).
export function useClassMissRecovery(examId: string) {
  const hydrated = useHydration();
  useEffect(() => {
    if (!hydrated) return;
    const { trainingAnswerHistory, completedTests, selectedState } = useStore.getState();
    const exam = examId === DMV_EXAM_ID ? undefined : getExamById(examId);
    if (examId !== DMV_EXAM_ID && !exam) return;
    const ours = (id: string) => (exam ? id.startsWith(exam.questionIdPrefix) : !isExamQuestionId(id));
    const stateCode = exam ? exam.stateCode : selectedState;
    const history = [
      ...trainingAnswerHistory
        .filter((a) => a.answeredAt && ours(a.questionId))
        .map((a) => ({ q: a.questionId, ok: a.isCorrect, t: a.answeredAt! })),
      ...completedTests
        .filter((t) => t.state === stateCode)
        .flatMap((t) =>
          t.answers
            .filter((a) => ours(a.questionId))
            .map((a) => ({ q: a.questionId, ok: a.isCorrect, t: new Date(a.answeredAt ?? t.completedAt ?? 0).toISOString() })),
        ),
    ];
    recoverClassMisses(examId, history);
  }, [examId, hydrated]);
}

export function ClassMissRecovery({ examId }: { examId: string }) {
  useClassMissRecovery(examId);
  return null;
}
