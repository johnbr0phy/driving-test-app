"use client";

import "@/lib/banks/caweld";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CaweldStatsPage() {
  return <ExamStatsPage exam={getExamById("caweld")!} />;
}
