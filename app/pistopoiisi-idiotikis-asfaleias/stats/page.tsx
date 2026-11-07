"use client";

import "@/lib/banks/grsecurity";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function GrsecurityStatsPage() {
  return <ExamStatsPage exam={getExamById("grsecurity")!} />;
}
