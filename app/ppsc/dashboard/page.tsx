"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PpscDashboardPage() {
  return <ExamDashboard exam={getExamById("ppsc")!} />;
}
