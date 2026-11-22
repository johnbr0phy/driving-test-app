"use client";

import "@/lib/banks/nlmoto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NlmotoStatsPage() {
  return <ExamStatsPage exam={getExamById("nlmoto")!} />;
}
