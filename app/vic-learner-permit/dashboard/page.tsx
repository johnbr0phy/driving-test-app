"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AuvicDashboardPage() {
  return <ExamDashboard exam={getExamById("auvic")!} />;
}
