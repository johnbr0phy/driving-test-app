"use client";

import "@/lib/banks/hvacjourney";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HvacJourneymanStatsPage() {
  return <ExamStatsPage exam={getExamById("hvacjourney")!} />;
}
