"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UklituDashboardPage() {
  return <ExamDashboard exam={getExamById("uklitu")!} />;
}
