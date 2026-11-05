"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HkLePaper1DashboardPage() {
  return <ExamDashboard exam={getExamById("hklesfi1")!} />;
}
