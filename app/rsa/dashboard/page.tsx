"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AursaDashboardPage() {
  return <ExamDashboard exam={getExamById("aursa")!} />;
}
