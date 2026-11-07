"use client";

import "@/lib/banks/fihunt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FihuntStatsPage() {
  return <ExamStatsPage exam={getExamById("fihunt")!} />;
}
