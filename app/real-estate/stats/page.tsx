"use client";

import "@/lib/banks/realestate";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function RealestateStatsPage() {
  return <ExamStatsPage exam={getExamById("realestate")!} />;
}
