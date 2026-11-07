"use client";

import "@/lib/banks/dkindfoed";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DkindfoedStatsPage() {
  return <ExamStatsPage exam={getExamById("dkindfoed")!} />;
}
