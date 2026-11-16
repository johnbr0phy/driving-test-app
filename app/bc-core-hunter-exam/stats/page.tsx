"use client";

import "@/lib/banks/cacore";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function BcCoreStatsPage() {
  return <ExamStatsPage exam={getExamById("cacore")!} />;
}
