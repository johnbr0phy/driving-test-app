"use client";

import "@/lib/banks/ccaf";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function ClaudeArchitectStatsPage() {
  return <ExamStatsPage exam={getExamById("ccaf")!} />;
}
