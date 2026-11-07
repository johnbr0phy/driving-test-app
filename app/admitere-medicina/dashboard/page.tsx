"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function RoadmedDashboardPage() {
  return <ExamDashboard exam={getExamById("roadmed")!} />;
}
