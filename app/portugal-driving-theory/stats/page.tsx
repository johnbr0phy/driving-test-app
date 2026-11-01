"use client";

import "@/lib/banks/ptimt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PtimtStatsPage() {
  return <ExamStatsPage exam={getExamById("ptimt")!} />;
}
