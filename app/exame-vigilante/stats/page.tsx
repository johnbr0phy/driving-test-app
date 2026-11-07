"use client";

import "@/lib/banks/ptvigil";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PtvigilStatsPage() {
  return <ExamStatsPage exam={getExamById("ptvigil")!} />;
}
