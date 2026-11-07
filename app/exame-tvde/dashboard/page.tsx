"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PttvdeDashboardPage() {
  return <ExamDashboard exam={getExamById("pttvde")!} />;
}
