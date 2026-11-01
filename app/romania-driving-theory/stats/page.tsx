"use client";

import "@/lib/banks/rodrpciv";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function RodrpcivStatsPage() {
  return <ExamStatsPage exam={getExamById("rodrpciv")!} />;
}
