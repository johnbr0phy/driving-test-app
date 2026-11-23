"use client";

import "@/lib/banks/deeinb";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function DeeinbDrillPage() {
  return <ExamDrillPage exam={getExamById("deeinb")!} />;
}
