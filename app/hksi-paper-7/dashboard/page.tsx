"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HksiPaper7DashboardPage() {
  return <ExamDashboard exam={getExamById("hklesfi7")!} />;
}
