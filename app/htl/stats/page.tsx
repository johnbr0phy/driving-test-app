"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HTLStatsPage() {
  return <ExamStatsPage exam={getExamById("htl")!} />;
}
