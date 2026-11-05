"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NzsfeDashboardPage() {
  return <ExamDashboard exam={getExamById("nzsfe")!} />;
}
