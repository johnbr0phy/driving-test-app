"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PlaplikDashboardPage() {
  return <ExamDashboard exam={getExamById("plaplik")!} />;
}
