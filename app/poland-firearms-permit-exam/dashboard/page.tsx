"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PlbronDashboardPage() {
  return <ExamDashboard exam={getExamById("plbron")!} />;
}
