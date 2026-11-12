"use client";

import "@/lib/banks/ukbregs";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkbregsStatsPage() {
  return <ExamStatsPage exam={getExamById("ukbregs")!} />;
}
