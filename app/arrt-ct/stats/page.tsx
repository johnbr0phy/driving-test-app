"use client";

import "@/lib/banks/arrtct";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function ArrtCtStatsPage() {
  return <ExamStatsPage exam={getExamById("arrtct")!} />;
}
