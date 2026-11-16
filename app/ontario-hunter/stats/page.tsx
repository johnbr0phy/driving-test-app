"use client";

import "@/lib/banks/cahunteron";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CahunteronStatsPage() {
  return <ExamStatsPage exam={getExamById("cahunteron")!} />;
}
