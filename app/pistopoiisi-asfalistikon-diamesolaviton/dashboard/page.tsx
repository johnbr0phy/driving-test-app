"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function GrinsureDashboardPage() {
  return <ExamDashboard exam={getExamById("grinsure")!} />;
}
