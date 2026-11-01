"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PkdriveDashboardPage() {
  return <ExamDashboard exam={getExamById("pkdrive")!} />;
}
