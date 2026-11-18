"use client";

import "@/lib/banks/appraiser";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AppraiserStatsPage() {
  return <ExamStatsPage exam={getExamById("appraiser")!} />;
}
