"use client";

import "@/lib/banks/cca";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CcaStatsPage() {
  return <ExamStatsPage exam={getExamById("cca")!} />;
}
