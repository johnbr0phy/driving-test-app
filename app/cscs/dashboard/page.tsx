"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CscsDashboardPage() {
  return <ExamDashboard exam={getExamById("cscs")!} />;
}
