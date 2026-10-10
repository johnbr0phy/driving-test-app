"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function LifeguardDashboardPage() {
  return <ExamDashboard exam={getExamById("lifeguard")!} />;
}
