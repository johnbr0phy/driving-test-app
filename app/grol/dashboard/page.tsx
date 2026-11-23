"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function GrolDashboardPage() {
  return <ExamDashboard exam={getExamById("grol")!} />;
}
