"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CahunteronDashboardPage() {
  return <ExamDashboard exam={getExamById("cahunteron")!} />;
}
