"use client";

import "@/lib/banks/nlwft";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NlwftStatsPage() {
  return <ExamStatsPage exam={getExamById("nlwft")!} />;
}
