"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function SgSecurityDashboardPage() {
  return <ExamDashboard exam={getExamById("sgsecurity")!} />;
}
