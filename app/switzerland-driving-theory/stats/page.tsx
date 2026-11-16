"use client";

import "@/lib/banks/chtheory";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function ChtheoryStatsPage() {
  return <ExamStatsPage exam={getExamById("chtheory")!} />;
}
