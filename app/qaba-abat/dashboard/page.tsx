"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function QabaAbatDashboardPage() {
  return <ExamDashboard exam={getExamById("qabaabat")!} />;
}
