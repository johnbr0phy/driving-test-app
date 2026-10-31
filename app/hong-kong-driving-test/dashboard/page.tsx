"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HkdriveDashboardPage() {
  return <ExamDashboard exam={getExamById("hkdrive")!} />;
}
