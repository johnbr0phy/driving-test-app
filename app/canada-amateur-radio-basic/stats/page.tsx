"use client";

import "@/lib/banks/cahambasic";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CahambasicStatsPage() {
  return <ExamStatsPage exam={getExamById("cahambasic")!} />;
}
