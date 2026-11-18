"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Epa609DashboardPage() {
  return <ExamDashboard exam={getExamById("epa609")!} />;
}
