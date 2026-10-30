"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CaguardDashboardPage() {
  return <ExamDashboard exam={getExamById("caguard")!} />;
}
