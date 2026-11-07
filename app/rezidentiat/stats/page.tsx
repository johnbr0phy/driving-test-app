"use client";

import "@/lib/banks/rorezid";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function RorezidStatsPage() {
  return <ExamStatsPage exam={getExamById("rorezid")!} />;
}
