"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function UkrbiDashboardPage() {
  return <ExamDashboard exam={getExamById("ukrbi")!} />;
}
