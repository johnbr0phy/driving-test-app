"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function MotorcycleDashboardPage() {
  return <ExamDashboard exam={getExamById("moto")!} />;
}
