"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function FrcacesDashboardPage() {
  return <ExamDashboard exam={getExamById("frcaces")!} />;
}
