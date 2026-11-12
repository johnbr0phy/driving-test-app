"use client";

import "@/lib/banks/ukgas";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkgasStatsPage() {
  return <ExamStatsPage exam={getExamById("ukgas")!} />;
}
