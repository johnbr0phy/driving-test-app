"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function ItnauticaDashboardPage() {
  return <ExamDashboard exam={getExamById("itnautica")!} />;
}
