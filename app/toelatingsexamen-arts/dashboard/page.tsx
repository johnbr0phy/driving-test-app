"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function BetoelatingDashboardPage() {
  return <ExamDashboard exam={getExamById("betoelating")!} />;
}
