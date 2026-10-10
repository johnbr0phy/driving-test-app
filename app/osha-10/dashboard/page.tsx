"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function OshaDashboardPage() {
  return <ExamDashboard exam={getExamById("osha")!} />;
}
