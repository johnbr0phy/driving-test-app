"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function ServingItRightDashboardPage() {
  return <ExamDashboard exam={getExamById("servingitright")!} />;
}
