"use client";

import "@/lib/banks/nzheavy";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NzheavyStatsPage() {
  return <ExamStatsPage exam={getExamById("nzheavy")!} />;
}
