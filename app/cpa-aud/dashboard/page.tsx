"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CpaAudDashboardPage() {
  return <ExamDashboard exam={getExamById("cpaaud")!} />;
}
