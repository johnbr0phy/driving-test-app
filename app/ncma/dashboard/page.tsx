"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NcmaDashboardPage() {
  return <ExamDashboard exam={getExamById("ncma")!} />;
}
