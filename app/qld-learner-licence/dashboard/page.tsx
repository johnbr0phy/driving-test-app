"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AuqldDashboardPage() {
  return <ExamDashboard exam={getExamById("auqld")!} />;
}
