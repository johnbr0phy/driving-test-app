"use client";

import "@/lib/banks/sgsnb";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SgsnbStatsPage() {
  return <ExamStatsPage exam={getExamById("sgsnb")!} />;
}
