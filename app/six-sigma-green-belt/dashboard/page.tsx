"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function SixSigmaGreenBeltDashboardPage() {
  return <ExamDashboard exam={getExamById("cssgb")!} />;
}
