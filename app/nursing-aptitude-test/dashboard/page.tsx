"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PhnatDashboardPage() {
  return <ExamDashboard exam={getExamById("phnat")!} />;
}
