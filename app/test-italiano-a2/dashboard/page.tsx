"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Ita2DashboardPage() {
  return <ExamDashboard exam={getExamById("ita2")!} />;
}
