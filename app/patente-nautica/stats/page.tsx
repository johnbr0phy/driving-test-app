"use client";

import "@/lib/banks/itnautica";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function ItnauticaStatsPage() {
  return <ExamStatsPage exam={getExamById("itnautica")!} />;
}
