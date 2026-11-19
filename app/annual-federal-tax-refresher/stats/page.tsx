"use client";

import "@/lib/banks/afsp";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AnnualFederalTaxRefresherStatsPage() {
  return <ExamStatsPage exam={getExamById("afsp")!} />;
}
