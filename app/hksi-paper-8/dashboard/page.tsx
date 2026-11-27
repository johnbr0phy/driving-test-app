"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HksiPaper8DashboardPage() {
  return <ExamDashboard exam={getExamById("hklesfi8")!} />;
}
