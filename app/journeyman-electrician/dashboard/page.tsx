"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function JelecDashboardPage() {
  return <ExamDashboard exam={getExamById("jelec")!} />;
}
