"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CansDashboardPage() {
  return <ExamDashboard exam={getExamById("cans")!} />;
}
