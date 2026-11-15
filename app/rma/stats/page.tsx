"use client";

import "@/lib/banks/rma";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function RmaStatsPage() {
  return <ExamStatsPage exam={getExamById("rma")!} />;
}
