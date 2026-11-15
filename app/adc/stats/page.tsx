"use client";

import "@/lib/banks/cadc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AdcStatsPage() {
  return <ExamStatsPage exam={getExamById("cadc")!} />;
}
