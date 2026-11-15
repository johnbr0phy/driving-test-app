"use client";

import "@/lib/banks/hspacis";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HspaCisStatsPage() {
  return <ExamStatsPage exam={getExamById("hspacis")!} />;
}
