"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function FaaMechanicAirframeDashboardPage() {
  return <ExamDashboard exam={getExamById("faaama")!} />;
}
