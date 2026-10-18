"use client";

import "@/lib/banks/ccma";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CcmaStatsPage() {
  return <ExamStatsPage exam={getExamById("ccma")!} />;
}
