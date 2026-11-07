"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function SemedbDashboardPage() {
  return <ExamDashboard exam={getExamById("semedb")!} />;
}
