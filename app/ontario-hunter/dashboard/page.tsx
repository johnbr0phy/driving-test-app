"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function OntarioHunterDashboardPage() {
  return <ExamDashboard exam={getExamById("cahunteron")!} />;
}
