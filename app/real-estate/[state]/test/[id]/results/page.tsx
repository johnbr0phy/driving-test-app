"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function RealestateStateResultsPage() {
  return <ExamResultsPage exam={useExamVariant("realestate")} />;
}
