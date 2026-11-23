"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Series24DashboardPage() {
  return <ExamDashboard exam={getExamById("series24")!} />;
}
