"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function DanbDashboardPage() {
  return <ExamDashboard exam={getExamById("danb")!} />;
}
