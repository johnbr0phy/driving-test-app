"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NzhamDashboardPage() {
  return <ExamDashboard exam={getExamById("nzham")!} />;
}
