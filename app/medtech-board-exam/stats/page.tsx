"use client";

import "@/lib/banks/phmedtech";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PhmedtechStatsPage() {
  return <ExamStatsPage exam={getExamById("phmedtech")!} />;
}
