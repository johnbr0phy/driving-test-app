"use client";

import "@/lib/banks/qabaabat";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function QabaAbatStatsPage() {
  return <ExamStatsPage exam={getExamById("qabaabat")!} />;
}
