"use client";

import "@/lib/banks/sgbtt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SgbttStatsPage() {
  return <ExamStatsPage exam={getExamById("sgbtt")!} />;
}
