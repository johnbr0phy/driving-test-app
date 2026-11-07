"use client";

import "@/lib/banks/grinsure";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function GrinsureStatsPage() {
  return <ExamStatsPage exam={getExamById("grinsure")!} />;
}
