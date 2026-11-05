"use client";

import "@/lib/banks/nzmoto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NzmotoStatsPage() {
  return <ExamStatsPage exam={getExamById("nzmoto")!} />;
}
