"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PhmidwifeDashboardPage() {
  return <ExamDashboard exam={getExamById("phmidwife")!} />;
}
