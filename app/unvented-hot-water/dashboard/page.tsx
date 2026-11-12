"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Ukg3DashboardPage() {
  return <ExamDashboard exam={getExamById("ukg3")!} />;
}
