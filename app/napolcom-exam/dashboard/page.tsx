"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PhnapolcomDashboardPage() {
  return <ExamDashboard exam={getExamById("phnapolcom")!} />;
}
