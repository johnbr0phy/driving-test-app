"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CaabDashboardPage() {
  return <ExamDashboard exam={getExamById("caab")!} />;
}
