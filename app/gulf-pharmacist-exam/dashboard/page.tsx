"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AedhapharmDashboardPage() {
  return <ExamDashboard exam={getExamById("aedhapharm")!} />;
}
