"use client";

import "@/lib/banks/aedhapharm";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AedhapharmStatsPage() {
  return <ExamStatsPage exam={getExamById("aedhapharm")!} />;
}
