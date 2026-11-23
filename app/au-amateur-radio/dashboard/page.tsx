"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AuhamDashboardPage() {
  return <ExamDashboard exam={getExamById("auham")!} />;
}
