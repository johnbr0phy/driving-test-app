"use client";

import "@/lib/banks/cssgb";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SixSigmaGreenBeltStatsPage() {
  return <ExamStatsPage exam={getExamById("cssgb")!} />;
}
