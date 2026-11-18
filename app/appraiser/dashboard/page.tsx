"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AppraiserDashboardPage() {
  return <ExamDashboard exam={getExamById("appraiser")!} />;
}
