"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Zare5DashboardPage() {
  return <ExamDashboard exam={getExamById("zare5")!} />;
}
