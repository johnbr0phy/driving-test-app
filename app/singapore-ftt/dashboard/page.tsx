"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function SgfttDashboardPage() {
  return <ExamDashboard exam={getExamById("sgftt")!} />;
}
