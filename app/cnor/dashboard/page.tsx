"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CnorDashboardPage() {
  return <ExamDashboard exam={getExamById("cnor")!} />;
}
