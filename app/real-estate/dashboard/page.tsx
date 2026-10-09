"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function RealestateDashboardPage() {
  return <ExamDashboard exam={getExamById("realestate")!} />;
}
