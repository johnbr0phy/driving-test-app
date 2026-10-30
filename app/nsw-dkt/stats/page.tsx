"use client";

import "@/lib/banks/aunsw";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AunswStatsPage() {
  return <ExamStatsPage exam={getExamById("aunsw")!} />;
}
