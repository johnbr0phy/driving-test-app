"use client";

import "@/lib/banks/backflow";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function BackflowStatsPage() {
  return <ExamStatsPage exam={getExamById("backflow")!} />;
}
