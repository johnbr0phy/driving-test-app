"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function DanbrhsDashboardPage() {
  return <ExamDashboard exam={getExamById("danbrhs")!} />;
}
