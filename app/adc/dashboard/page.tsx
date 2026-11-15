"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AdcDashboardPage() {
  return <ExamDashboard exam={getExamById("cadc")!} />;
}
