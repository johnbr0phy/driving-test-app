"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UkmotoDashboardPage() {
  return <ExamDashboard exam={getExamById("ukmoto")!} />;
}
