"use client";

import "@/lib/banks/kenck";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function KenckStatsPage() {
  return <ExamStatsPage exam={getExamById("kenck")!} />;
}
