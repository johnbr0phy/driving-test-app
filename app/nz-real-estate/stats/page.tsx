"use client";

import "@/lib/banks/nzrealestate";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NzrealestateStatsPage() {
  return <ExamStatsPage exam={getExamById("nzrealestate")!} />;
}
