"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function TexespprDashboardPage() {
  return <ExamDashboard exam={getExamById("texesppr")!} />;
}
