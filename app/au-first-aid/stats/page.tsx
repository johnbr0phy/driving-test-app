"use client";

import "@/lib/banks/aufirstaid";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AuFirstAidStatsPage() {
  return <ExamStatsPage exam={getExamById("aufirstaid")!} />;
}
