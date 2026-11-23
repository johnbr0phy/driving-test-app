"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NscaCptDashboardPage() {
  return <ExamDashboard exam={getExamById("nscacpt")!} />;
}
