"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function ClaudeArchitectDashboardPage() {
  return <ExamDashboard exam={getExamById("ccaf")!} />;
}
