"use client";

import "@/lib/banks/proserve";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function ProServeStatsPage() {
  return <ExamStatsPage exam={getExamById("proserve")!} />;
}
