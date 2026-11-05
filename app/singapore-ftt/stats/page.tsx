"use client";

import "@/lib/banks/sgftt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SgfttStatsPage() {
  return <ExamStatsPage exam={getExamById("sgftt")!} />;
}
