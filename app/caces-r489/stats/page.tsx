"use client";

import "@/lib/banks/frcaces";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FrcacesStatsPage() {
  return <ExamStatsPage exam={getExamById("frcaces")!} />;
}
