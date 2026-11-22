"use client";

import "@/lib/banks/plaplik";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PlaplikStatsPage() {
  return <ExamStatsPage exam={getExamById("plaplik")!} />;
}
