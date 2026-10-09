"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HTLDashboardPage() {
  return <ExamDashboard exam={getExamById("htl")!} />;
}
