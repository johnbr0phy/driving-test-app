"use client";

import "@/lib/banks/ukfood3";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkFood3StatsPage() {
  return <ExamStatsPage exam={getExamById("ukfood3")!} />;
}
