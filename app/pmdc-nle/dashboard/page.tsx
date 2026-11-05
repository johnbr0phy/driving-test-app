"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PknleDashboardPage() {
  return <ExamDashboard exam={getExamById("pknle")!} />;
}
