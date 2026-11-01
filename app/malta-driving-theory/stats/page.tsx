"use client";

import "@/lib/banks/mttheory";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function MttheoryStatsPage() {
  return <ExamStatsPage exam={getExamById("mttheory")!} />;
}
