"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CetStatsPage() {
  return <ExamStatsPage exam={getExamById("cet")!} />;
}
