"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AplusDashboardPage() {
  return <ExamDashboard exam={getExamById("aplus")!} />;
}
