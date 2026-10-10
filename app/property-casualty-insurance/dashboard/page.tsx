"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PncDashboardPage() {
  return <ExamDashboard exam={getExamById("pnc")!} />;
}
