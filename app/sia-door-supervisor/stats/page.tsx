"use client";

import "@/lib/banks/uksia";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UksiaStatsPage() {
  return <ExamStatsPage exam={getExamById("uksia")!} />;
}
