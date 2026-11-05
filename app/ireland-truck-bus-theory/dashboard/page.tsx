"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function IedttcvDashboardPage() {
  return <ExamDashboard exam={getExamById("iedttcv")!} />;
}
