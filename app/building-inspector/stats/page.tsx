"use client";

import "@/lib/banks/ukrbi";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkrbiStatsPage() {
  return <ExamStatsPage exam={getExamById("ukrbi")!} />;
}
