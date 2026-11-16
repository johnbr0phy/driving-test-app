"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function SmartServeDashboardPage() {
  return <ExamDashboard exam={getExamById("smartserve")!} />;
}
