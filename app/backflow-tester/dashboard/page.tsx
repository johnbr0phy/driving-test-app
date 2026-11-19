"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function BackflowDashboardPage() {
  return <ExamDashboard exam={getExamById("backflow")!} />;
}
