"use client";

import "@/lib/banks/nltheorie";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NltheorieStatsPage() {
  return <ExamStatsPage exam={getExamById("nltheorie")!} />;
}
