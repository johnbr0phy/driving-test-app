"use client";

import "@/lib/banks/crfsc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CrfscStatsPage() {
  return <ExamStatsPage exam={getExamById("crfsc")!} />;
}
