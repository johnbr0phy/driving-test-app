"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function EsccseDashboardPage() {
  return <ExamDashboard exam={getExamById("esccse")!} />;
}
