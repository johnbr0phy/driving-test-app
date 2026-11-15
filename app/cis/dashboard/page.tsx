"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HspaCisDashboardPage() {
  return <ExamDashboard exam={getExamById("hspacis")!} />;
}
