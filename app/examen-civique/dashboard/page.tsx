"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function FrciviqueDashboardPage() {
  return <ExamDashboard exam={getExamById("frcivique")!} />;
}
