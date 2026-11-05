"use client";

import "@/lib/banks/ieqfa";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function IeQfaStatsPage() {
  return <ExamStatsPage exam={getExamById("ieqfa")!} />;
}
