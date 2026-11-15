"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function RptDashboardPage() {
  return <ExamDashboard exam={getExamById("rpt")!} />;
}
