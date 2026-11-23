"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function CarsrefrigDashboardPage() {
  return <ExamDashboard exam={getExamById("carsrefrig")!} />;
}
