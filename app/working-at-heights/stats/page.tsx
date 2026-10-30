"use client";

import "@/lib/banks/auwah";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AuwahStatsPage() {
  return <ExamStatsPage exam={getExamById("auwah")!} />;
}
