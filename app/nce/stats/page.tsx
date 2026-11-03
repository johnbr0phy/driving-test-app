"use client";

import "@/lib/banks/nce";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NceStatsPage() {
  return <ExamStatsPage exam={getExamById("nce")!} />;
}
