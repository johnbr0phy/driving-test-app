"use client";

import "@/lib/banks/cans";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CansStatsPage() {
  return <ExamStatsPage exam={getExamById("cans")!} />;
}
