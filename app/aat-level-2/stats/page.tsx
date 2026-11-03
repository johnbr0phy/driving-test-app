"use client";

import "@/lib/banks/aatl2";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AatL2StatsPage() {
  return <ExamStatsPage exam={getExamById("aatl2")!} />;
}
