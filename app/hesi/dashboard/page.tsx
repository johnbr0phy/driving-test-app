"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HesiDashboardPage() {
  return <ExamDashboard exam={getExamById("hesi")!} />;
}
