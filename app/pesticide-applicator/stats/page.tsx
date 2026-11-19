"use client";

import "@/lib/banks/pesticide";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PesticideStatsPage() {
  return <ExamStatsPage exam={getExamById("pesticide")!} />;
}
