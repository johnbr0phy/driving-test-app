"use client";

import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function InsuranceStateTrainingPage() {
  return <ExamTrainingPage exam={useExamVariant("insurance")} />;
}
