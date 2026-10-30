"use client";

import "@/lib/banks/gulfrn";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function GulfrnStatsPage() {
  return <ExamStatsPage exam={getExamById("gulfrn")!} />;
}
