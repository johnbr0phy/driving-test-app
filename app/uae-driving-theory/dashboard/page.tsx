"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AertaDashboardPage() {
  return <ExamDashboard exam={getExamById("aerta")!} />;
}
