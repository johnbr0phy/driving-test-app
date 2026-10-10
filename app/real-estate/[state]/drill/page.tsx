"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function RealestateStateDrillPage() {
  return <ExamDrillPage exam={useExamVariant("realestate")} />;
}
