"use client";

import "@/lib/banks/boating";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function BoatingStatsPage() {
  return <ExamStatsPage exam={getExamById("boating")!} />;
}
