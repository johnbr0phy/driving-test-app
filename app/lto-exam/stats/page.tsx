"use client";

import "@/lib/banks/phlto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PhltoStatsPage() {
  return <ExamStatsPage exam={getExamById("phlto")!} />;
}
