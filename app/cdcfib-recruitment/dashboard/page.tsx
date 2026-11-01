"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CdcfibDashboardPage() {
  return <ExamDashboard exam={getExamById("cdcfib")!} />;
}
