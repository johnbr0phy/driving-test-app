"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function FrmPart1DashboardPage() {
  return <ExamDashboard exam={getExamById("frm1")!} />;
}
