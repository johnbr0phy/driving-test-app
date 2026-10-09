"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function FoodmgrDashboardPage() {
  return <ExamDashboard exam={getExamById("foodmgr")!} />;
}
