"use client";

import "@/lib/banks/grol";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function GrolStatsPage() {
  return <ExamStatsPage exam={getExamById("grol")!} />;
}
