"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CmaDashboardPage() {
  return <ExamDashboard exam={getExamById("cma")!} />;
}
