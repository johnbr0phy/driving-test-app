"use client";

import "@/lib/banks/lifeHealthStates";
import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function InsuranceStateResultsPage() {
  return <ExamResultsPage exam={useExamVariant("insurance")} />;
}
