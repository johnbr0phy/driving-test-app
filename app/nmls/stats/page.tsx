"use client";

import "@/lib/banks/nmls";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NmlsStatsPage() {
  return <ExamStatsPage exam={getExamById("nmls")!} />;
}
