"use client";

import "@/lib/banks/aswbclin";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AswbClinStatsPage() {
  return <ExamStatsPage exam={getExamById("aswbclin")!} />;
}
