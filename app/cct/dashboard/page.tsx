"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CctDashboardPage() {
  return <ExamDashboard exam={getExamById("cct")!} />;
}
