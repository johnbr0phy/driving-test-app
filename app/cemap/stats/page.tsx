"use client";

import "@/lib/banks/cemap";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CemapStatsPage() {
  return <ExamStatsPage exam={getExamById("cemap")!} />;
}
