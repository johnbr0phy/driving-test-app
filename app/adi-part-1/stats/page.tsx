"use client";

import "@/lib/banks/ukadi";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkadiStatsPage() {
  return <ExamStatsPage exam={getExamById("ukadi")!} />;
}
