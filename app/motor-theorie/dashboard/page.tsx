"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NlmotoDashboardPage() {
  return <ExamDashboard exam={getExamById("nlmoto")!} />;
}
