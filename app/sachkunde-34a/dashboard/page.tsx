"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function De34aDashboardPage() {
  return <ExamDashboard exam={getExamById("de34a")!} />;
}
