"use client";

import "@/lib/banks/esvigilante";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function EsvigilanteStatsPage() {
  return <ExamStatsPage exam={getExamById("esvigilante")!} />;
}
