"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UklgvDashboardPage() {
  return <ExamDashboard exam={getExamById("uklgv")!} />;
}
