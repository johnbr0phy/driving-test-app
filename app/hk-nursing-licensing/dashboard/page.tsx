"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function HkNursingDashboardPage() {
  return <ExamDashboard exam={getExamById("hknurse")!} />;
}
