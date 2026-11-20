"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function RhitDashboardPage() {
  return <ExamDashboard exam={getExamById("rhit")!} />;
}
