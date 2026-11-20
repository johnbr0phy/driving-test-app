"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function LmrtDashboardPage() {
  return <ExamDashboard exam={getExamById("lmrt")!} />;
}
