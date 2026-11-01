"use client";

import "@/lib/banks/trcnpqe";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function TrcnpqeStatsPage() {
  return <ExamStatsPage exam={getExamById("trcnpqe")!} />;
}
