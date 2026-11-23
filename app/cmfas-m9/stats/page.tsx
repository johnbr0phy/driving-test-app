"use client";

import "@/lib/banks/sgm9";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CmfasM9StatsPage() {
  return <ExamStatsPage exam={getExamById("sgm9")!} />;
}
