"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NzFirearmsDashboardPage() {
  return <ExamDashboard exam={getExamById("nzfirearms")!} />;
}
