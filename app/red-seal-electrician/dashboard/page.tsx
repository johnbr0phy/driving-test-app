"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CaelecDashboardPage() {
  return <ExamDashboard exam={getExamById("caelec")!} />;
}
