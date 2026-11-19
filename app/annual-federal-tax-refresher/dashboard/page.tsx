"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AnnualFederalTaxRefresherDashboardPage() {
  return <ExamDashboard exam={getExamById("afsp")!} />;
}
