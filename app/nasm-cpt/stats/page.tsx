"use client";

import "@/lib/banks/nasm";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NasmStatsPage() {
  return <ExamStatsPage exam={getExamById("nasm")!} />;
}
