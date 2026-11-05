"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PhmedtechDashboardPage() {
  return <ExamDashboard exam={getExamById("phmedtech")!} />;
}
