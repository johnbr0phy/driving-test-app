"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AbGuardDashboardPage() {
  return <ExamDashboard exam={getExamById("caabguard")!} />;
}
