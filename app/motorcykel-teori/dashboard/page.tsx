"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function SemotoDashboardPage() {
  return <ExamDashboard exam={getExamById("semoto")!} />;
}
