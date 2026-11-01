"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PtimtDashboardPage() {
  return <ExamDashboard exam={getExamById("ptimt")!} />;
}
