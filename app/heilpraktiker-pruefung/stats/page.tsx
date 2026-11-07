"use client";

import "@/lib/banks/deheilpr";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DeheilprStatsPage() {
  return <ExamStatsPage exam={getExamById("deheilpr")!} />;
}
