"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HuelsosegDashboardPage() {
  return <ExamDashboard exam={getExamById("huelsoseg")!} />;
}
