"use client";

import "@/lib/banks/deeinb";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DeeinbStatsPage() {
  return <ExamStatsPage exam={getExamById("deeinb")!} />;
}
