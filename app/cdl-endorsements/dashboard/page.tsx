"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CDLEndorsementsDashboardPage() {
  return <ExamDashboard exam={getExamById("cdlx")!} />;
}
