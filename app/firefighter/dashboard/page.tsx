"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function FfiDashboardPage() {
  return <ExamDashboard exam={getExamById("ffi")!} />;
}
