"use client";

import "@/lib/banks/cpabar";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CpaBarStatsPage() {
  return <ExamStatsPage exam={getExamById("cpabar")!} />;
}
