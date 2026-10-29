"use client";

import "@/lib/banks/auwa";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AuwaStatsPage() {
  return <ExamStatsPage exam={getExamById("auwa")!} />;
}
