"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function SixSigmaYellowBeltDashboardPage() {
  return <ExamDashboard exam={getExamById("cssyb")!} />;
}
