"use client";

import "@/lib/banks/ngpolice";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NgpoliceStatsPage() {
  return <ExamStatsPage exam={getExamById("ngpolice")!} />;
}
