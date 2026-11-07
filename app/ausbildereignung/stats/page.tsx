"use client";

import "@/lib/banks/deaevo";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DeaevoStatsPage() {
  return <ExamStatsPage exam={getExamById("deaevo")!} />;
}
