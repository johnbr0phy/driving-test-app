"use client";

import "@/lib/banks/itcils";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function ItcilsStatsPage() {
  return <ExamStatsPage exam={getExamById("itcils")!} />;
}
