"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AwsDashboardPage() {
  return <ExamDashboard exam={getExamById("aws")!} />;
}
