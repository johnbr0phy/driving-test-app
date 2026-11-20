"use client";

import "@/lib/banks/rhia";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function RhiaStatsPage() {
  return <ExamStatsPage exam={getExamById("rhia")!} />;
}
