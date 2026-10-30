"use client";

import "@/lib/banks/ukfood";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkfoodStatsPage() {
  return <ExamStatsPage exam={getExamById("ukfood")!} />;
}
