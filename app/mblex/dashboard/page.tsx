"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function MblexDashboardPage() {
  return <ExamDashboard exam={getExamById("mblex")!} />;
}
