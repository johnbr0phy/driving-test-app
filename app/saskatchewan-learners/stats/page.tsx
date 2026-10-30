"use client";

import "@/lib/banks/cask";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CaskStatsPage() {
  return <ExamStatsPage exam={getExamById("cask")!} />;
}
