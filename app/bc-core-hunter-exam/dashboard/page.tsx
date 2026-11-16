"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function BcCoreDashboardPage() {
  return <ExamDashboard exam={getExamById("cacore")!} />;
}
