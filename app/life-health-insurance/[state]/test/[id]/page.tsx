"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function InsuranceStateTestPage() {
  return <ExamTestPage exam={useExamVariant("insurance")} />;
}
