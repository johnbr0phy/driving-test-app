"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Zak53c3DashboardPage() {
  return <ExamDashboard exam={getExamById("zak53c3")!} />;
}
