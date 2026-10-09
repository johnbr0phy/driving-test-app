"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function EmtDashboardPage() {
  return <ExamDashboard exam={getExamById("emt")!} />;
}
