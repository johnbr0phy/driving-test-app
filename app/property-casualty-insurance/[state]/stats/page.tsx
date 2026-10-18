"use client";

import "@/lib/banks/propertyCasualtyStates";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function PncStateStatsPage() {
  return <ExamStatsPage exam={useExamVariant("pnc")} />;
}
