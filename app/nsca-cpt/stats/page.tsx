"use client";

import "@/lib/banks/nscacpt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NscaCptStatsPage() {
  return <ExamStatsPage exam={getExamById("nscacpt")!} />;
}
