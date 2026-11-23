"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CmfasM9aDashboardPage() {
  return <ExamDashboard exam={getExamById("sgm9a")!} />;
}
