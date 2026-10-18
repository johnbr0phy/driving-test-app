"use client";

import "@/lib/banks/cna";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CnaStatsPage() {
  return <ExamStatsPage exam={getExamById("cna")!} />;
}
