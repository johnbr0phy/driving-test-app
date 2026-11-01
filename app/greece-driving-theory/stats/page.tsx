"use client";

import "@/lib/banks/grdriving";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function GrdrivingStatsPage() {
  return <ExamStatsPage exam={getExamById("grdriving")!} />;
}
