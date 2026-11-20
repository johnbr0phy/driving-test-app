"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HamgeneralDashboardPage() {
  return <ExamDashboard exam={getExamById("hamgeneral")!} />;
}
