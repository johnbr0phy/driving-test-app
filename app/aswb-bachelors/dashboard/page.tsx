"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AswbBachDashboardPage() {
  return <ExamDashboard exam={getExamById("aswbbach")!} />;
}
