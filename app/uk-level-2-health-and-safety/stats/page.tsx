"use client";

import "@/lib/banks/ukhs2";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkHs2StatsPage() {
  return <ExamStatsPage exam={getExamById("ukhs2")!} />;
}
