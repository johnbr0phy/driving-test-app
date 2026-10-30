"use client";

import "@/lib/banks/cawhmis";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CawhmisStatsPage() {
  return <ExamStatsPage exam={getExamById("cawhmis")!} />;
}
