"use client";

import "@/lib/banks/dktruck";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DktruckStatsPage() {
  return <ExamStatsPage exam={getExamById("dktruck")!} />;
}
