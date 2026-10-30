"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UkseruDashboardPage() {
  return <ExamDashboard exam={getExamById("ukseru")!} />;
}
