"use client";

import "@/lib/banks/ppsc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PpscStatsPage() {
  return <ExamStatsPage exam={getExamById("ppsc")!} />;
}
