"use client";

import "@/lib/banks/txpersonal";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function TexasPersonalLinesStatsPage() {
  return <ExamStatsPage exam={getExamById("txpersonal")!} />;
}
