"use client";

import "@/lib/banks/mblex";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function MblexStatsPage() {
  return <ExamStatsPage exam={getExamById("mblex")!} />;
}
