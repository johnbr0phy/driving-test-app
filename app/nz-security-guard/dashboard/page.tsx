"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NzsecurityDashboardPage() {
  return <ExamDashboard exam={getExamById("nzsecurity")!} />;
}
