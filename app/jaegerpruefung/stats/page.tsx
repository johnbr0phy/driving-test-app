"use client";

import "@/lib/banks/dejagd";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DejagdStatsPage() {
  return <ExamStatsPage exam={getExamById("dejagd")!} />;
}
