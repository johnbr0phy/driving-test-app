"use client";

import "@/lib/banks/lifeHealthStates";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function InsuranceStateStatsPage() {
  return <ExamStatsPage exam={useExamVariant("insurance")} />;
}
