"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UkbregsDashboardPage() {
  return <ExamDashboard exam={getExamById("ukbregs")!} />;
}
