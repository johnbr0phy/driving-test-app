"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Part107DashboardPage() {
  return <ExamDashboard exam={getExamById("part107")!} />;
}
