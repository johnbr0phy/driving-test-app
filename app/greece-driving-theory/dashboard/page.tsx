"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function GrdrivingDashboardPage() {
  return <ExamDashboard exam={getExamById("grdriving")!} />;
}
