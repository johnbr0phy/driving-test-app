"use client";

import "@/lib/banks/rdexam";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function RdExamStatsPage() {
  return <ExamStatsPage exam={getExamById("rdexam")!} />;
}
