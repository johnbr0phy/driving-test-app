"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AeReraDashboardPage() {
  return <ExamDashboard exam={getExamById("aerera")!} />;
}
