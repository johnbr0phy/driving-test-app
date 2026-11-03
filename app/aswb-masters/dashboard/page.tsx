"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AswbDashboardPage() {
  return <ExamDashboard exam={getExamById("aswb")!} />;
}
