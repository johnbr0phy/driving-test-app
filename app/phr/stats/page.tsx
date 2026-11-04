"use client";

import "@/lib/banks/phr";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PhrStatsPage() {
  return <ExamStatsPage exam={getExamById("phr")!} />;
}
