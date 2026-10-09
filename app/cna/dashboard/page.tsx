"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CnaDashboardPage() {
  return <ExamDashboard exam={getExamById("cna")!} />;
}
