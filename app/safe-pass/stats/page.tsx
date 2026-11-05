"use client";

import "@/lib/banks/iesafepass";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function IeSafePassStatsPage() {
  return <ExamStatsPage exam={getExamById("iesafepass")!} />;
}
