"use client";

import "@/lib/banks/dkmoto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DkmotoStatsPage() {
  return <ExamStatsPage exam={getExamById("dkmoto")!} />;
}
