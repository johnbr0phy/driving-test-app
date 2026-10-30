"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function GulfrnDashboardPage() {
  return <ExamDashboard exam={getExamById("gulfrn")!} />;
}
