"use client";

import "@/lib/banks/de34a";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function De34aStatsPage() {
  return <ExamStatsPage exam={getExamById("de34a")!} />;
}
