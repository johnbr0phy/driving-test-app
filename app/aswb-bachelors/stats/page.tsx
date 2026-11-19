"use client";

import "@/lib/banks/aswbbach";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AswbBachStatsPage() {
  return <ExamStatsPage exam={getExamById("aswbbach")!} />;
}
