"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function Osha30DashboardPage() {
  return <ExamDashboard exam={getExamById("osha30")!} />;
}
