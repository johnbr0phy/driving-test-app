"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function FrmotoDashboardPage() {
  return <ExamDashboard exam={getExamById("frmoto")!} />;
}
