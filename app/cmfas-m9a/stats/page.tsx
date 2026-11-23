"use client";

import "@/lib/banks/sgm9a";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CmfasM9aStatsPage() {
  return <ExamStatsPage exam={getExamById("sgm9a")!} />;
}
