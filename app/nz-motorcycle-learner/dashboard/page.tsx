"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NzmotoDashboardPage() {
  return <ExamDashboard exam={getExamById("nzmoto")!} />;
}
