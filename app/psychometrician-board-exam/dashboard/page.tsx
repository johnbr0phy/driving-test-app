"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PhpsychomDashboardPage() {
  return <ExamDashboard exam={getExamById("phpsychom")!} />;
}
