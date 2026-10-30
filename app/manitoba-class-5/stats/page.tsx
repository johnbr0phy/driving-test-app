"use client";

import "@/lib/banks/camb";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CambStatsPage() {
  return <ExamStatsPage exam={getExamById("camb")!} />;
}
