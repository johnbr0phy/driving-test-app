"use client";

import "@/lib/banks/esdgt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function EsdgtStatsPage() {
  return <ExamStatsPage exam={getExamById("esdgt")!} />;
}
