"use client";

import "@/lib/banks/escapcond";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function EscapcondStatsPage() {
  return <ExamStatsPage exam={getExamById("escapcond")!} />;
}
