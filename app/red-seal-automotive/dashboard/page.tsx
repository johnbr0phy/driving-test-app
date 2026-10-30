"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CaautoDashboardPage() {
  return <ExamDashboard exam={getExamById("caauto")!} />;
}
