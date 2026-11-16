"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NzBoatDashboardPage() {
  return <ExamDashboard exam={getExamById("nzboat")!} />;
}
