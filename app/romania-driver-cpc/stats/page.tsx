"use client";

import "@/lib/banks/rocpi";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function RocpiStatsPage() {
  return <ExamStatsPage exam={getExamById("rocpi")!} />;
}
