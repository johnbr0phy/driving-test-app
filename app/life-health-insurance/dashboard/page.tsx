"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function InsuranceDashboardPage() {
  return <ExamDashboard exam={getExamById("insurance")!} />;
}
