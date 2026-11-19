"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function EstheticianDashboardPage() {
  return <ExamDashboard exam={getExamById("esthetician")!} />;
}
