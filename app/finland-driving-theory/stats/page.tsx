"use client";

import "@/lib/banks/fitheory";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FitheoryStatsPage() {
  return <ExamStatsPage exam={getExamById("fitheory")!} />;
}
