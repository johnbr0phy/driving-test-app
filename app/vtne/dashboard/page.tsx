"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function VtneDashboardPage() {
  return <ExamDashboard exam={getExamById("vtne")!} />;
}
