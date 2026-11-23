"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UkSqe1DashboardPage() {
  return <ExamDashboard exam={getExamById("uksqe1")!} />;
}
