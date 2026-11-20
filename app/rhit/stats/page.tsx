"use client";

import "@/lib/banks/rhit";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function RhitStatsPage() {
  return <ExamStatsPage exam={getExamById("rhit")!} />;
}
