"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function PncStateResultsPage() {
  return <ExamResultsPage exam={useExamVariant("pnc")} />;
}
