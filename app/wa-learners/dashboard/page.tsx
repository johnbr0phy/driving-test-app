"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AuwaDashboardPage() {
  return <ExamDashboard exam={getExamById("auwa")!} />;
}
