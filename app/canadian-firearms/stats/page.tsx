"use client";

import "@/lib/banks/capal";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CapalStatsPage() {
  return <ExamStatsPage exam={getExamById("capal")!} />;
}
