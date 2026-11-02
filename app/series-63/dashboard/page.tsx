"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Series63DashboardPage() {
  return <ExamDashboard exam={getExamById("series63")!} />;
}
