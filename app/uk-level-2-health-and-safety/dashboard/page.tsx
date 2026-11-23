"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UkHs2DashboardPage() {
  return <ExamDashboard exam={getExamById("ukhs2")!} />;
}
