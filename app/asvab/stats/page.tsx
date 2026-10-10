"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AsvabStatsPage() {
  return <ExamStatsPage exam={getExamById("asvab")!} />;
}
