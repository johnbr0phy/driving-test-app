"use client";

import "@/lib/banks/capsw";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CapswStatsPage() {
  return <ExamStatsPage exam={getExamById("capsw")!} />;
}
