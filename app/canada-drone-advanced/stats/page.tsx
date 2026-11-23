"use client";

import "@/lib/banks/cadroneadv";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CanadaDroneAdvancedStatsPage() {
  return <ExamStatsPage exam={getExamById("cadroneadv")!} />;
}
