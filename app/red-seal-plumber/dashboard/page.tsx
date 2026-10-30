"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function RedSealPlumberDashboardPage() {
  return <ExamDashboard exam={getExamById("caplumb")!} />;
}
