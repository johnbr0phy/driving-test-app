"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CcrnDashboardPage() {
  return <ExamDashboard exam={getExamById("ccrn")!} />;
}
