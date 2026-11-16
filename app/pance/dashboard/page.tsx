"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PanceDashboardPage() {
  return <ExamDashboard exam={getExamById("pance")!} />;
}
