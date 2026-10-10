"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AccuplacerStatsPage() {
  return <ExamStatsPage exam={getExamById("accuplacer")!} />;
}
