"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CaskDashboardPage() {
  return <ExamDashboard exam={getExamById("cask")!} />;
}
