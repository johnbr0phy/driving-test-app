"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Series6DashboardPage() {
  return <ExamDashboard exam={getExamById("series6")!} />;
}
