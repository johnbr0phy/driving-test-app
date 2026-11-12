"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UkwaterDashboardPage() {
  return <ExamDashboard exam={getExamById("ukwater")!} />;
}
