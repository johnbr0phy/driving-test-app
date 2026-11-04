"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CcsDashboardPage() {
  return <ExamDashboard exam={getExamById("ccs")!} />;
}
