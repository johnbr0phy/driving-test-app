"use client";

import "@/lib/banks/aafcs";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AafcsHnfsStatsPage() {
  return <ExamStatsPage exam={getExamById("aafcs")!} />;
}
