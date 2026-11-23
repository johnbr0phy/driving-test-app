"use client";

import "@/lib/banks/ukdrone";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkDroneStatsPage() {
  return <ExamStatsPage exam={getExamById("ukdrone")!} />;
}
