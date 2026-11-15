"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AseDashboardPage() {
  return <ExamDashboard exam={getExamById("ase")!} />;
}
