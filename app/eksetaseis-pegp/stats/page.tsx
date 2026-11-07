"use client";

import "@/lib/banks/grcitizen";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function GrcitizenStatsPage() {
  return <ExamStatsPage exam={getExamById("grcitizen")!} />;
}
