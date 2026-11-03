"use client";

import "@/lib/banks/accafa";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AccaFaStatsPage() {
  return <ExamStatsPage exam={getExamById("accafa")!} />;
}
