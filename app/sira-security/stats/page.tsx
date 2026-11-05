"use client";

import "@/lib/banks/aesira";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AeSiraStatsPage() {
  return <ExamStatsPage exam={getExamById("aesira")!} />;
}
