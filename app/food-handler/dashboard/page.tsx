"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function FoodhandlerDashboardPage() {
  return <ExamDashboard exam={getExamById("foodhandler")!} />;
}
