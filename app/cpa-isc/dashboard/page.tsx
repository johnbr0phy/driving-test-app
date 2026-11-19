"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CpaIscDashboardPage() {
  return <ExamDashboard exam={getExamById("cpaisc")!} />;
}
