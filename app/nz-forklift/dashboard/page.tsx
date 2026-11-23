"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NzForkliftDashboardPage() {
  return <ExamDashboard exam={getExamById("nzforklift")!} />;
}
