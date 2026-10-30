"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CapalDashboardPage() {
  return <ExamDashboard exam={getExamById("capal")!} />;
}
