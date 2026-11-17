"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function BcGuardDashboardPage() {
  return <ExamDashboard exam={getExamById("cabcguard")!} />;
}
