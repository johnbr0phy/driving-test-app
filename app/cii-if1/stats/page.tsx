"use client";

import "@/lib/banks/ukif1";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CiiIf1StatsPage() {
  return <ExamStatsPage exam={getExamById("ukif1")!} />;
}
