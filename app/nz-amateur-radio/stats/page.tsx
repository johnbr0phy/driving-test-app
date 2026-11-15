"use client";

import "@/lib/banks/nzham";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NzhamStatsPage() {
  return <ExamStatsPage exam={getExamById("nzham")!} />;
}
