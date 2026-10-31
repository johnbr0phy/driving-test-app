"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function KentsaDashboardPage() {
  return <ExamDashboard exam={getExamById("kentsa")!} />;
}
