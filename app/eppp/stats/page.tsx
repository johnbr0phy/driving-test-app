"use client";

import "@/lib/banks/eppp";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function EpppStatsPage() {
  return <ExamStatsPage exam={getExamById("eppp")!} />;
}
