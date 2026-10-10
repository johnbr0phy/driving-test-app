"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CprDashboardPage() {
  return <ExamDashboard exam={getExamById("cpr")!} />;
}
