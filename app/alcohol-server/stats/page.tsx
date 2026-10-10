"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AlcoholStatsPage() {
  return <ExamStatsPage exam={getExamById("alcohol")!} />;
}
