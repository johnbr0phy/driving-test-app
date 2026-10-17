"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function InsuranceStateDrillPage() {
  return <ExamDrillPage exam={useExamVariant("insurance")} />;
}
