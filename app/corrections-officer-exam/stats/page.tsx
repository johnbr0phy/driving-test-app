"use client";

import "@/lib/banks/corrections";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CorrectionsExamStatsPage() {
  return <ExamStatsPage exam={getExamById("corrections")!} />;
}
