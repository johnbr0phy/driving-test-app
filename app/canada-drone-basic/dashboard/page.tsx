"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CanadaDroneBasicDashboardPage() {
  return <ExamDashboard exam={getExamById("cadronebasic")!} />;
}
