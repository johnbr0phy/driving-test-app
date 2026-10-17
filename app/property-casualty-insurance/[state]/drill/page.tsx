"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function PncStateDrillPage() {
  return <ExamDrillPage exam={useExamVariant("pnc")} />;
}
