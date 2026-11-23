"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function GasTech3DashboardPage() {
  return <ExamDashboard exam={getExamById("cagas3")!} />;
}
