"use client";

import "@/lib/banks/hukreszmoto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HukreszmotoStatsPage() {
  return <ExamStatsPage exam={getExamById("hukreszmoto")!} />;
}
