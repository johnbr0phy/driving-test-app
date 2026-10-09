"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CSTStatsPage() {
  return <ExamStatsPage exam={getExamById("cst")!} />;
}
