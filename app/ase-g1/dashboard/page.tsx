"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AseG1DashboardPage() {
  return <ExamDashboard exam={getExamById("aseg1")!} />;
}
