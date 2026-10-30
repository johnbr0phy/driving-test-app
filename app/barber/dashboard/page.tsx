"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function BarberDashboardPage() {
  return <ExamDashboard exam={getExamById("barber")!} />;
}
