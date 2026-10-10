"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function ForkliftDashboardPage() {
  return <ExamDashboard exam={getExamById("forklift")!} />;
}
