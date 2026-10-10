"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function RealestateStateTestPage() {
  return <ExamTestPage exam={useExamVariant("realestate")} />;
}
