"use client";

import "@/lib/banks/schoolbus";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SchoolBusStatsPage() {
  return <ExamStatsPage exam={getExamById("schoolbus")!} />;
}
