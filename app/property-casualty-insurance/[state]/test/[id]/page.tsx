"use client";

import "@/lib/banks/propertyCasualtyStates";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { useExamVariant } from "@/hooks/useExamVariant";

export default function PncStateTestPage() {
  return <ExamTestPage exam={useExamVariant("pnc")} />;
}
