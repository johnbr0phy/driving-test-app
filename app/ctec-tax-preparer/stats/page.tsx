"use client";

import "@/lib/banks/ctec";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CtecTaxPreparerStatsPage() {
  return <ExamStatsPage exam={getExamById("ctec")!} />;
}
