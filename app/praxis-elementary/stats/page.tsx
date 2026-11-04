"use client";

import "@/lib/banks/praxis5001";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Praxis5001StatsPage() {
  return <ExamStatsPage exam={getExamById("praxis5001")!} />;
}
