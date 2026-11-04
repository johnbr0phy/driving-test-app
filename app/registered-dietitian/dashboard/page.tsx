"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function RdExamDashboardPage() {
  return <ExamDashboard exam={getExamById("rdexam")!} />;
}
