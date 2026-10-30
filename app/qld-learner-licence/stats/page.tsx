"use client";

import "@/lib/banks/auqld";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AuqldStatsPage() {
  return <ExamStatsPage exam={getExamById("auqld")!} />;
}
