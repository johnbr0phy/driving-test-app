"use client";

import "@/lib/banks/pcoc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PcocStatsPage() {
  return <ExamStatsPage exam={getExamById("pcoc")!} />;
}
