"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function ZasapsDashboardPage() {
  return <ExamDashboard exam={getExamById("zasaps")!} />;
}
