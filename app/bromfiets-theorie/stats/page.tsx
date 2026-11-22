"use client";

import "@/lib/banks/nlbrom";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NlbromStatsPage() {
  return <ExamStatsPage exam={getExamById("nlbrom")!} />;
}
