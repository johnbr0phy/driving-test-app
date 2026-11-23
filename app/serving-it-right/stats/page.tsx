"use client";

import "@/lib/banks/servingitright";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function ServingItRightStatsPage() {
  return <ExamStatsPage exam={getExamById("servingitright")!} />;
}
