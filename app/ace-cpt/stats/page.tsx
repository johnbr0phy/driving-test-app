"use client";

import "@/lib/banks/acecpt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AceCptStatsPage() {
  return <ExamStatsPage exam={getExamById("acecpt")!} />;
}
