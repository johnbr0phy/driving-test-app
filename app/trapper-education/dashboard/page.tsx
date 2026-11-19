"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function TrapperDashboardPage() {
  return <ExamDashboard exam={getExamById("trapper")!} />;
}
