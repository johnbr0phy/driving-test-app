"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DanbStatsPage() {
  return <ExamStatsPage exam={getExamById("danb")!} />;
}
