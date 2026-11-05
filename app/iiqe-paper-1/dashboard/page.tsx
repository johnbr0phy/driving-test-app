"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function IiqePaper1DashboardPage() {
  return <ExamDashboard exam={getExamById("hkiiqe1")!} />;
}
