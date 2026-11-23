"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UkFood3DashboardPage() {
  return <ExamDashboard exam={getExamById("ukfood3")!} />;
}
