"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NgfrscDashboardPage() {
  return <ExamDashboard exam={getExamById("ngfrsc")!} />;
}
