"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AatL2DashboardPage() {
  return <ExamDashboard exam={getExamById("aatl2")!} />;
}
