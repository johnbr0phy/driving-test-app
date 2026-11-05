"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function MypceDashboardPage() {
  return <ExamDashboard exam={getExamById("mypce")!} />;
}
