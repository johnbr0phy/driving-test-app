"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NzrealestateDashboardPage() {
  return <ExamDashboard exam={getExamById("nzrealestate")!} />;
}
