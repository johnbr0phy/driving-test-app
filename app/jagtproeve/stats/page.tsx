"use client";

import "@/lib/banks/dkjagt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DkjagtStatsPage() {
  return <ExamStatsPage exam={getExamById("dkjagt")!} />;
}
