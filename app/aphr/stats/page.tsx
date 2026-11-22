"use client";

import "@/lib/banks/aphr";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AphrStatsPage() {
  return <ExamStatsPage exam={getExamById("aphr")!} />;
}
