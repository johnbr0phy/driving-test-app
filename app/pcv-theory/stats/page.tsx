"use client";

import "@/lib/banks/ukpcv";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkpcvStatsPage() {
  return <ExamStatsPage exam={getExamById("ukpcv")!} />;
}
