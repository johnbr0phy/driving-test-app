"use client";

import "@/lib/banks/hamextra";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HamextraStatsPage() {
  return <ExamStatsPage exam={getExamById("hamextra")!} />;
}
