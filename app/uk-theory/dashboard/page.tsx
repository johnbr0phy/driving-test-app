"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UkcarDashboardPage() {
  return <ExamDashboard exam={getExamById("ukcar")!} />;
}
