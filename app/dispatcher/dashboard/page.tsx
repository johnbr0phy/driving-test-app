"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function DispatcherDashboardPage() {
  return <ExamDashboard exam={getExamById("dispatcher")!} />;
}
