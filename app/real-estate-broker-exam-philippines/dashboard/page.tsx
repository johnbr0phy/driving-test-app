"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function PhrebrokerDashboardPage() {
  return <ExamDashboard exam={getExamById("phrebroker")!} />;
}
