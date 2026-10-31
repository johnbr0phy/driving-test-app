"use client";

import "@/lib/banks/kentsa";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function KentsaStatsPage() {
  return <ExamStatsPage exam={getExamById("kentsa")!} />;
}
