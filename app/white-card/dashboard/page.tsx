"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function WhiteCardDashboardPage() {
  return <ExamDashboard exam={getExamById("auwhite")!} />;
}
