"use client";

import "@/lib/banks/nzsfe";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NzsfeStatsPage() {
  return <ExamStatsPage exam={getExamById("nzsfe")!} />;
}
