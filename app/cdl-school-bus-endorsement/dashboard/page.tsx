"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function SchoolBusDashboardPage() {
  return <ExamDashboard exam={getExamById("schoolbus")!} />;
}
