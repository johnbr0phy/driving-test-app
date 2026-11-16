"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CehrsDashboardPage() {
  return <ExamDashboard exam={getExamById("cehrs")!} />;
}
