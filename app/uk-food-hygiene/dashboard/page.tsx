"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UkfoodDashboardPage() {
  return <ExamDashboard exam={getExamById("ukfood")!} />;
}
