"use client";

import "@/lib/banks/phpharm";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PhpharmStatsPage() {
  return <ExamStatsPage exam={getExamById("phpharm")!} />;
}
