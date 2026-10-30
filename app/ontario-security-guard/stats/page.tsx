"use client";

import "@/lib/banks/caguard";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CaguardStatsPage() {
  return <ExamStatsPage exam={getExamById("caguard")!} />;
}
