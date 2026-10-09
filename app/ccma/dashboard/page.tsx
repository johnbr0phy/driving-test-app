"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CcmaDashboardPage() {
  return <ExamDashboard exam={getExamById("ccma")!} />;
}
