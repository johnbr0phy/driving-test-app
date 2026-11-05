"use client";

import "@/lib/banks/iespsv";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function IespsvStatsPage() {
  return <ExamStatsPage exam={getExamById("iespsv")!} />;
}
