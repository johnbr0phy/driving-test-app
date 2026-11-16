"use client";

import "@/lib/banks/pance";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PanceStatsPage() {
  return <ExamStatsPage exam={getExamById("pance")!} />;
}
