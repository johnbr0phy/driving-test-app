"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Praxis5001DashboardPage() {
  return <ExamDashboard exam={getExamById("praxis5001")!} />;
}
