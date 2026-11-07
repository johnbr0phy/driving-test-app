"use client";

import "@/lib/banks/bemoto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function BemotoStatsPage() {
  return <ExamStatsPage exam={getExamById("bemoto")!} />;
}
