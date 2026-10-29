"use client";

import "@/lib/banks/caab";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CaabStatsPage() {
  return <ExamStatsPage exam={getExamById("caab")!} />;
}
