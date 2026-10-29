"use client";

import "@/lib/banks/ukmoto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkmotoStatsPage() {
  return <ExamStatsPage exam={getExamById("ukmoto")!} />;
}
