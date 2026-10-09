"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SecplusStatsPage() {
  return <ExamStatsPage exam={getExamById("secplus")!} />;
}
