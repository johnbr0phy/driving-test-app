"use client";

import "@/lib/banks/detheorie";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DetheorieStatsPage() {
  return <ExamStatsPage exam={getExamById("detheorie")!} />;
}
