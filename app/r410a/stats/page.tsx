"use client";

import "@/lib/banks/r410a";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function R410aStatsPage() {
  return <ExamStatsPage exam={getExamById("r410a")!} />;
}
