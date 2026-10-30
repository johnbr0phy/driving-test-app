"use client";

import "@/lib/banks/rbt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function RbtStatsPage() {
  return <ExamStatsPage exam={getExamById("rbt")!} />;
}
