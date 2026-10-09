"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Epa608DashboardPage() {
  return <ExamDashboard exam={getExamById("epa608")!} />;
}
