"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CaonDashboardPage() {
  return <ExamDashboard exam={getExamById("caon")!} />;
}
