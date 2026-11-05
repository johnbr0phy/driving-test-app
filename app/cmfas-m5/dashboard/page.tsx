"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CmfasM5DashboardPage() {
  return <ExamDashboard exam={getExamById("sgm5")!} />;
}
