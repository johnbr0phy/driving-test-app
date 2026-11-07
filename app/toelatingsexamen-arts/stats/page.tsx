"use client";

import "@/lib/banks/betoelating";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function BetoelatingStatsPage() {
  return <ExamStatsPage exam={getExamById("betoelating")!} />;
}
