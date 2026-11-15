"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CrfscDashboardPage() {
  return <ExamDashboard exam={getExamById("crfsc")!} />;
}
