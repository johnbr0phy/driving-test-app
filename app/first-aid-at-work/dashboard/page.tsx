"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UkfawDashboardPage() {
  return <ExamDashboard exam={getExamById("ukfaw")!} />;
}
