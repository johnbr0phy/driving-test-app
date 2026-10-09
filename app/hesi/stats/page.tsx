"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HesiStatsPage() {
  return <ExamStatsPage exam={getExamById("hesi")!} />;
}
