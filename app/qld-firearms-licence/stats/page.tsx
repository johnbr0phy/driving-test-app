"use client";

import "@/lib/banks/aufirearmsqld";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function QldFirearmsStatsPage() {
  return <ExamStatsPage exam={getExamById("aufirearmsqld")!} />;
}
