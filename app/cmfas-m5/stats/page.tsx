"use client";

import "@/lib/banks/sgm5";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CmfasM5StatsPage() {
  return <ExamStatsPage exam={getExamById("sgm5")!} />;
}
