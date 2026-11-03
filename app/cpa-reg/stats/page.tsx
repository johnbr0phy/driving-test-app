"use client";

import "@/lib/banks/cpareg";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CpaRegStatsPage() {
  return <ExamStatsPage exam={getExamById("cpareg")!} />;
}
