"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function SgvlDashboardPage() {
  return <ExamDashboard exam={getExamById("sgvl")!} />;
}
