"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function IePlumbT2DashboardPage() {
  return <ExamDashboard exam={getExamById("ieplumbt2")!} />;
}
