"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function EscapcondDashboardPage() {
  return <ExamDashboard exam={getExamById("escapcond")!} />;
}
