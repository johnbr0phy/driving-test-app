"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NlbromDashboardPage() {
  return <ExamDashboard exam={getExamById("nlbrom")!} />;
}
