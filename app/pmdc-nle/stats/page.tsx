"use client";

import "@/lib/banks/pknle";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PknleStatsPage() {
  return <ExamStatsPage exam={getExamById("pknle")!} />;
}
