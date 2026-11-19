"use client";

import "@/lib/banks/excpt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function ExcptStatsPage() {
  return <ExamStatsPage exam={getExamById("excpt")!} />;
}
