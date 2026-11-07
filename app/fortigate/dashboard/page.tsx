"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function FortigateDashboardPage() {
  return <ExamDashboard exam={getExamById("fortigate")!} />;
}
