"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function BemotoDashboardPage() {
  return <ExamDashboard exam={getExamById("bemoto")!} />;
}
