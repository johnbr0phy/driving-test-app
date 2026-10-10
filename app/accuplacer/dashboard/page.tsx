"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function AccuplacerDashboardPage() {
  return <ExamDashboard exam={getExamById("accuplacer")!} />;
}
