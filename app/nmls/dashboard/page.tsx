"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NmlsDashboardPage() {
  return <ExamDashboard exam={getExamById("nmls")!} />;
}
