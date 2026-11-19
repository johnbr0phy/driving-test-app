"use client";

import "@/lib/banks/cpb";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CpbStatsPage() {
  return <ExamStatsPage exam={getExamById("cpb")!} />;
}
