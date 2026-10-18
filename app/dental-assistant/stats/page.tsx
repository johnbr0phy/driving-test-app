"use client";

import "@/lib/banks/danb";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DanbStatsPage() {
  return <ExamStatsPage exam={getExamById("danb")!} />;
}
