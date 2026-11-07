"use client";

import "@/lib/banks/semoto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SemotoStatsPage() {
  return <ExamStatsPage exam={getExamById("semoto")!} />;
}
