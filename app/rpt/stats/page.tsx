"use client";

import "@/lib/banks/rpt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function RptStatsPage() {
  return <ExamStatsPage exam={getExamById("rpt")!} />;
}
