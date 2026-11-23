"use client";

import "@/lib/banks/crat";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CratStatsPage() {
  return <ExamStatsPage exam={getExamById("crat")!} />;
}
