"use client";

import "@/lib/banks/pllek";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PllekStatsPage() {
  return <ExamStatsPage exam={getExamById("pllek")!} />;
}
