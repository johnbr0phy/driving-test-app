"use client";

import "@/lib/banks/carstruck";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CarstruckStatsPage() {
  return <ExamStatsPage exam={getExamById("carstruck")!} />;
}
