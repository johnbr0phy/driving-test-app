"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function DktruckDashboardPage() {
  return <ExamDashboard exam={getExamById("dktruck")!} />;
}
