"use client";

import "@/lib/banks/danbrhs";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DanbrhsStatsPage() {
  return <ExamStatsPage exam={getExamById("danbrhs")!} />;
}
