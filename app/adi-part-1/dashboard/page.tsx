"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UkadiDashboardPage() {
  return <ExamDashboard exam={getExamById("ukadi")!} />;
}
