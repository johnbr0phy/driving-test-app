"use client";

import "@/lib/banks/aswb";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AswbStatsPage() {
  return <ExamStatsPage exam={getExamById("aswb")!} />;
}
