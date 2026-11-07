"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function RocpiDashboardPage() {
  return <ExamDashboard exam={getExamById("rocpi")!} />;
}
