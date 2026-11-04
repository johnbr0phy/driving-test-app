"use client";

import "@/lib/banks/nbdhe";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NbdheStatsPage() {
  return <ExamStatsPage exam={getExamById("nbdhe")!} />;
}
