"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AeSiraDashboardPage() {
  return <ExamDashboard exam={getExamById("aesira")!} />;
}
