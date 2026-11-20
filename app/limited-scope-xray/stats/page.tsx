"use client";

import "@/lib/banks/lmrt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function LmrtStatsPage() {
  return <ExamStatsPage exam={getExamById("lmrt")!} />;
}
