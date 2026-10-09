"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function EmtStatsPage() {
  return <ExamStatsPage exam={getExamById("emt")!} />;
}
