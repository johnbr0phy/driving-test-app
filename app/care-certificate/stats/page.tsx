"use client";

import "@/lib/banks/ukcare";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkcareStatsPage() {
  return <ExamStatsPage exam={getExamById("ukcare")!} />;
}
