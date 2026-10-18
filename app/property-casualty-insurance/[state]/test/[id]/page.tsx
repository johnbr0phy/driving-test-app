"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function PncStateTestPage() {
  return <ExamTestPage exam={useExamVariant("pnc")} />;
}
