"use client";

import "@/lib/banks/cabc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CabcStatsPage() {
  return <ExamStatsPage exam={getExamById("cabc")!} />;
}
