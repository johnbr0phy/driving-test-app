"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NzheavyDashboardPage() {
  return <ExamDashboard exam={getExamById("nzheavy")!} />;
}
