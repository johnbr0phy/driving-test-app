"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function NptePtaDashboardPage() {
  return <ExamDashboard exam={getExamById("nptepta")!} />;
}
