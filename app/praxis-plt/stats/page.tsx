"use client";

import "@/lib/banks/praxisplt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PraxispltStatsPage() {
  return <ExamStatsPage exam={getExamById("praxisplt")!} />;
}
