"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CcaDashboardPage() {
  return <ExamDashboard exam={getExamById("cca")!} />;
}
