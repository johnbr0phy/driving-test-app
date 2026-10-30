"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CawhmisDashboardPage() {
  return <ExamDashboard exam={getExamById("cawhmis")!} />;
}
