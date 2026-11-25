"use client";

import "@/lib/banks/samuroor";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SamuroorStatsPage() {
  return <ExamStatsPage exam={getExamById("samuroor")!} />;
}
