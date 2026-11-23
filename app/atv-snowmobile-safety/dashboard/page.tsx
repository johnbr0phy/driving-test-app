"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AtvSafetyDashboardPage() {
  return <ExamDashboard exam={getExamById("atvsafety")!} />;
}
