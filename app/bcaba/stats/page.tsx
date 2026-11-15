"use client";

import "@/lib/banks/bcaba";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function BcabaStatsPage() {
  return <ExamStatsPage exam={getExamById("bcaba")!} />;
}
