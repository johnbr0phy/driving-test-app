"use client";

import "@/lib/banks/bevracht";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function BevrachtStatsPage() {
  return <ExamStatsPage exam={getExamById("bevracht")!} />;
}
