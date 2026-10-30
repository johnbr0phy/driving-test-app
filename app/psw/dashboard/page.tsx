"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CapswDashboardPage() {
  return <ExamDashboard exam={getExamById("capsw")!} />;
}
