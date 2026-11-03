"use client";

import "@/lib/banks/arrt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function ArrtStatsPage() {
  return <ExamStatsPage exam={getExamById("arrt")!} />;
}
