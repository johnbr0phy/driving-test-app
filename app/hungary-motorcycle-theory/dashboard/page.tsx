"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HukreszmotoDashboardPage() {
  return <ExamDashboard exam={getExamById("hukreszmoto")!} />;
}
