"use client";

import "@/lib/banks/aursa";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AursaStatsPage() {
  return <ExamStatsPage exam={getExamById("aursa")!} />;
}
