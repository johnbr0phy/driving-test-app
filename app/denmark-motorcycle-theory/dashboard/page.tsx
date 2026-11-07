"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function DkmotoDashboardPage() {
  return <ExamDashboard exam={getExamById("dkmoto")!} />;
}
