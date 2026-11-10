"use client";

import "@/lib/banks/phnat";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PhnatStatsPage() {
  return <ExamStatsPage exam={getExamById("phnat")!} />;
}
