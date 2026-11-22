"use client";

import "@/lib/banks/pals";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PalsStatsPage() {
  return <ExamStatsPage exam={getExamById("pals")!} />;
}
