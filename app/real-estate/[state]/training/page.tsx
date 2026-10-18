"use client";

import "@/lib/banks/realEstateStates";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function RealestateStateTrainingPage() {
  return <ExamTrainingPage exam={useExamVariant("realestate")} />;
}
