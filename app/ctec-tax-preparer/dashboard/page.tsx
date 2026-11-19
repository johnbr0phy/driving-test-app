"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CtecTaxPreparerDashboardPage() {
  return <ExamDashboard exam={getExamById("ctec")!} />;
}
