"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function EspoliciaDashboardPage() {
  return <ExamDashboard exam={getExamById("espolicia")!} />;
}
