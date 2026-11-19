"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CarscookDashboardPage() {
  return <ExamDashboard exam={getExamById("carscook")!} />;
}
