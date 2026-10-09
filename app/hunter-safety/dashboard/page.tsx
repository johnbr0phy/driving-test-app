"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HunterDashboardPage() {
  return <ExamDashboard exam={getExamById("hunter")!} />;
}
