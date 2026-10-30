"use client";

import "@/lib/banks/uklitu";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UklituStatsPage() {
  return <ExamStatsPage exam={getExamById("uklitu")!} />;
}
