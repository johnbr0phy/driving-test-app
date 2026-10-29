"use client";

import "@/lib/banks/ukcar";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkcarStatsPage() {
  return <ExamStatsPage exam={getExamById("ukcar")!} />;
}
