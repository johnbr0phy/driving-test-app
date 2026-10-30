"use client";

import "@/lib/banks/ukfaw";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkfawStatsPage() {
  return <ExamStatsPage exam={getExamById("ukfaw")!} />;
}
