"use client";

import "@/lib/banks/pttvde";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PttvdeStatsPage() {
  return <ExamStatsPage exam={getExamById("pttvde")!} />;
}
