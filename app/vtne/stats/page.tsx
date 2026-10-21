"use client";

import "@/lib/banks/vtne";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function VtneStatsPage() {
  return <ExamStatsPage exam={getExamById("vtne")!} />;
}
