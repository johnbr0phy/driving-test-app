"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function SetrafikDashboardPage() {
  return <ExamDashboard exam={getExamById("setrafik")!} />;
}
