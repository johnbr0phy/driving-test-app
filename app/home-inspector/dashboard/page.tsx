"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HomeInspectorDashboardPage() {
  return <ExamDashboard exam={getExamById("nhie")!} />;
}
