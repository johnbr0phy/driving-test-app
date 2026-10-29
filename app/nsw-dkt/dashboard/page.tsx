"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AunswDashboardPage() {
  return <ExamDashboard exam={getExamById("aunsw")!} />;
}
