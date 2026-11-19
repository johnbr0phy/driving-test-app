"use client";

import "@/lib/banks/dispatcher";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DispatcherStatsPage() {
  return <ExamStatsPage exam={getExamById("dispatcher")!} />;
}
