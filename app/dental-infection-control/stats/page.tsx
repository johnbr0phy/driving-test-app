"use client";

import "@/lib/banks/danbice";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DanbiceStatsPage() {
  return <ExamStatsPage exam={getExamById("danbice")!} />;
}
