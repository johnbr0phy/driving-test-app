"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NgpoliceDashboardPage() {
  return <ExamDashboard exam={getExamById("ngpolice")!} />;
}
