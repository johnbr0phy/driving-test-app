"use client";

import "@/lib/banks/pkpaf";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PkpafStatsPage() {
  return <ExamStatsPage exam={getExamById("pkpaf")!} />;
}
