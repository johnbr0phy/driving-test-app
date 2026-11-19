"use client";

import "@/lib/banks/esthetician";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function EstheticianStatsPage() {
  return <ExamStatsPage exam={getExamById("esthetician")!} />;
}
