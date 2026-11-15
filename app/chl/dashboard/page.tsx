"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HspaChlDashboardPage() {
  return <ExamDashboard exam={getExamById("hspachl")!} />;
}
