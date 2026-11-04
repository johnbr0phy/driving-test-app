"use client";

import "@/lib/banks/llqp";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function LlqpStatsPage() {
  return <ExamStatsPage exam={getExamById("llqp")!} />;
}
