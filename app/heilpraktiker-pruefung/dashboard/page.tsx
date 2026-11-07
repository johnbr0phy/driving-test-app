"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function DeheilprDashboardPage() {
  return <ExamDashboard exam={getExamById("deheilpr")!} />;
}
