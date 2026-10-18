"use client";

import "@/lib/banks/propertyCasualtyStates";
import { ExamTrainingPage } from "@/components/exam/ExamTrainingPage";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function PncStateTrainingPage() {
  return <ExamTrainingPage exam={useExamVariant("pnc")} />;
}
