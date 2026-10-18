"use client";

import "@/lib/banks/realEstateStates";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function RealestateStateStatsPage() {
  return <ExamStatsPage exam={useExamVariant("realestate")} />;
}
