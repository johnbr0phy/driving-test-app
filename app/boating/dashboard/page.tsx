"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function BoatingDashboardPage() {
  return <ExamDashboard exam={getExamById("boating")!} />;
}
