"use client";

import "@/lib/banks/ausa";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AusaStatsPage() {
  return <ExamStatsPage exam={getExamById("ausa")!} />;
}
