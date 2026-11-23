"use client";

import "@/lib/banks/cafsc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CaliforniaFscStatsPage() {
  return <ExamStatsPage exam={getExamById("cafsc")!} />;
}
