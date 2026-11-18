"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function RealEstateBrokerDashboardPage() {
  return <ExamDashboard exam={getExamById("realestatebroker")!} />;
}
