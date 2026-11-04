"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function TxAdjusterDashboardPage() {
  return <ExamDashboard exam={getExamById("txadjuster")!} />;
}
