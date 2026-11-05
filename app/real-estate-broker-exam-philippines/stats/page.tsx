"use client";

import "@/lib/banks/phrebroker";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PhrebrokerStatsPage() {
  return <ExamStatsPage exam={getExamById("phrebroker")!} />;
}
