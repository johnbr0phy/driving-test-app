"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CpaBarDashboardPage() {
  return <ExamDashboard exam={getExamById("cpabar")!} />;
}
