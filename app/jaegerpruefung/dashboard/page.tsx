"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function DejagdDashboardPage() {
  return <ExamDashboard exam={getExamById("dejagd")!} />;
}
