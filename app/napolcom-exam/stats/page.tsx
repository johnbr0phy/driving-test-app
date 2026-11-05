"use client";

import "@/lib/banks/phnapolcom";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PhnapolcomStatsPage() {
  return <ExamStatsPage exam={getExamById("phnapolcom")!} />;
}
