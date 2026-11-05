"use client";

import "@/lib/banks/phpsychom";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PhpsychomStatsPage() {
  return <ExamStatsPage exam={getExamById("phpsychom")!} />;
}
