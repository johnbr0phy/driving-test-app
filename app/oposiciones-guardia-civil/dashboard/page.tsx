"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function EsguardiaDashboardPage() {
  return <ExamDashboard exam={getExamById("esguardia")!} />;
}
