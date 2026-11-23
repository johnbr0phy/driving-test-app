"use client";

import "@/lib/banks/cssyb";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SixSigmaYellowBeltStatsPage() {
  return <ExamStatsPage exam={getExamById("cssyb")!} />;
}
