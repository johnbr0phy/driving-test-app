"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CanadaDroneAdvancedDashboardPage() {
  return <ExamDashboard exam={getExamById("cadroneadv")!} />;
}
