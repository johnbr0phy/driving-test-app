"use client";

import "@/lib/banks/cfp";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CfpStatsPage() {
  return <ExamStatsPage exam={getExamById("cfp")!} />;
}
