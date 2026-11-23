"use client";

import "@/lib/banks/esccse";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function EsccseStatsPage() {
  return <ExamStatsPage exam={getExamById("esccse")!} />;
}
