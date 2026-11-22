"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AphrDashboardPage() {
  return <ExamDashboard exam={getExamById("aphr")!} />;
}
