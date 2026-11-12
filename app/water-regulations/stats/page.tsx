"use client";

import "@/lib/banks/ukwater";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkwaterStatsPage() {
  return <ExamStatsPage exam={getExamById("ukwater")!} />;
}
