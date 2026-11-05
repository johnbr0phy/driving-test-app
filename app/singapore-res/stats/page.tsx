"use client";

import "@/lib/banks/sgres";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SgresStatsPage() {
  return <ExamStatsPage exam={getExamById("sgres")!} />;
}
