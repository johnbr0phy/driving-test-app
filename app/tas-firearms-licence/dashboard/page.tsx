"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function TasFirearmsDashboardPage() {
  return <ExamDashboard exam={getExamById("aufatas")!} />;
}
