"use client";

import "@/lib/banks/pkpnmc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PkpnmcStatsPage() {
  return <ExamStatsPage exam={getExamById("pkpnmc")!} />;
}
