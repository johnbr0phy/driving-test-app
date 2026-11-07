"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function FihuntDashboardPage() {
  return <ExamDashboard exam={getExamById("fihunt")!} />;
}
