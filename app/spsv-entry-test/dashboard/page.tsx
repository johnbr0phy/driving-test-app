"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function IespsvDashboardPage() {
  return <ExamDashboard exam={getExamById("iespsv")!} />;
}
