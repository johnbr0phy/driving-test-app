"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CorrectionsExamDashboardPage() {
  return <ExamDashboard exam={getExamById("corrections")!} />;
}
