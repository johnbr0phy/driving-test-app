"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function GrsecurityDashboardPage() {
  return <ExamDashboard exam={getExamById("grsecurity")!} />;
}
