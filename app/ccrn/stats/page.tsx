"use client";

import "@/lib/banks/ccrn";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CcrnStatsPage() {
  return <ExamStatsPage exam={getExamById("ccrn")!} />;
}
