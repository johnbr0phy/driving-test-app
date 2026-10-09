"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HamDashboardPage() {
  return <ExamDashboard exam={getExamById("ham")!} />;
}
