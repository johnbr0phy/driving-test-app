"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function MaceDashboardPage() {
  return <ExamDashboard exam={getExamById("mace")!} />;
}
