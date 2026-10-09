"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function SecplusDashboardPage() {
  return <ExamDashboard exam={getExamById("secplus")!} />;
}
