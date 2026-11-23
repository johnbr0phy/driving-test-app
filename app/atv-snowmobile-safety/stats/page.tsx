"use client";

import "@/lib/banks/atvsafety";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AtvSafetyStatsPage() {
  return <ExamStatsPage exam={getExamById("atvsafety")!} />;
}
