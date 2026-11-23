"use client";

import "@/lib/banks/auham";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AuhamStatsPage() {
  return <ExamStatsPage exam={getExamById("auham")!} />;
}
