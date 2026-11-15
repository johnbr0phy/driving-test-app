"use client";

import "@/lib/banks/bcba";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function BcbaStatsPage() {
  return <ExamStatsPage exam={getExamById("bcba")!} />;
}
