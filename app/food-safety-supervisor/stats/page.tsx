"use client";

import "@/lib/banks/aufss";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AufssStatsPage() {
  return <ExamStatsPage exam={getExamById("aufss")!} />;
}
