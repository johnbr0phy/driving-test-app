"use client";

import { ExamDashboard } from "@/components/exam/ExamDashboard";
import { getExamById } from "@/lib/exams";

export default function VicFirearmsDashboardPage() {
  return <ExamDashboard exam={getExamById("aufirearmsvic")!} />;
}
